/**
 * Encodes a date to a Base64 string for cleaner URLs.
 * Format: "2000-01-01" -> Base64
 */
export function encodeDateStats(date: Date): string {
    const isoDate = date.toISOString().split('T')[0];
    if (typeof window !== 'undefined') {
        return btoa(isoDate);
    }
    return Buffer.from(isoDate).toString('base64');
}

/**
 * Decodes a Base64 string back to a Date object.
 */
export function decodeDateStats(code: string): Date | null {
    try {
        let decoded = "";
        if (typeof window !== 'undefined') {
            decoded = atob(code);
        } else {
            decoded = Buffer.from(code, 'base64').toString('ascii');
        }

        // SANITIZATION: Strict Regex for YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(decoded)) {
            console.warn("Potential XSS blocked in URL parameter.");
            return null;
        }

        const date = new Date(decoded);
        return isNaN(date.getTime()) ? null : date;
    } catch (e) {
        console.error("Failed to decode date stats", e);
        return null;
    }
}
