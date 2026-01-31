/**
 * Simple text obfuscation/encryption for local storage.
 * NOT military grade, but prevents casual reading of localStorage.
 */

// Simple XOR cipher with a fixed key part and dynamic part
const SK = "TIME_CAPSULE_KEY";

export const encryptMessage = (text: string, salt: string): string => {
    try {
        const key = SK + salt;
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return btoa(result); // Base64 encode
    } catch (e) {
        console.error("Encryption failed", e);
        return "";
    }
};

export const decryptMessage = (encoded: string, salt: string): string => {
    try {
        const text = atob(encoded); // Base64 decode
        const key = SK + salt;
        let result = "";
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    } catch (e) {
        console.error("Decryption failed", e);
        return "";
    }
};
