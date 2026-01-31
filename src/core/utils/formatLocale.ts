import { format } from "date-fns";
import { enUS, id } from "date-fns/locale";

export function formatLocaleDate(date: Date, localeString: string): string {
    // US: MM/DD/YYYY
    // ID/World: DD/MM/YYYY

    const isUS = localeString === 'en-US' || localeString === 'en';

    if (isUS) {
        return format(date, "MM/dd/yyyy");
    } else {
        return format(date, "dd/MM/yyyy");
    }
}

export function formatDistanceUnit(km: number, localeString: string): string {
    const isUS = localeString === 'en-US' || localeString === 'en';

    if (isUS) {
        const miles = km * 0.621371;
        return `${miles.toLocaleString('en-US', { maximumFractionDigits: 1 })} Miles`;
    } else {
        const locale = localeString === 'id' ? 'id-ID' : 'en-GB';
        return `${km.toLocaleString(locale, { maximumFractionDigits: 1 })} KM`;
    }
}

export function formatCurrency(amount: number, localeString: string, currency: string = 'USD'): string {
    const locale = localeString === 'id' ? 'id-ID' : 'en-US';
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
