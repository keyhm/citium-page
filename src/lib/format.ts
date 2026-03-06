// Utility functions for formatting values across the app

/**
 * Formats a numeric price string (or number) using a thousands separator.
 *
 * The example output desired is "$ 1'000.000" which matches the
 * Swiss-style formatting (apostrophe for thousands, dot for decimals).
 * We leverage `toLocaleString('de-CH')` to produce that pattern.
 *
 * If the incoming string contains multiple prices separated by `/` we
 * format each part individually and rejoin them.
 */
export function formatPrice(value?: string | number): string {
    if (value == null || value === '') return '';
    const text = String(value);

    return text
        .split('/')
        .map(part => {
            // strip out any non-digit characters except dot and minus
            const cleaned = part.replace(/[^0-9.\-]/g, '').trim();
            const num = parseFloat(cleaned);
            if (isNaN(num)) {
                // if parsing fails just return the original trimmed piece
                return part.trim();
            }
            // Swiss locale gives apostrophe thousands separator
            const formattedNumber = num.toLocaleString('de-CH');
            return `$ ${formattedNumber}`;
        })
        .join(' / ');
}

/**
 * Format a plain number string with thousands separators (no currency).
 * Accepts either digits or an already formatted string.
 */
export function formatNumber(value?: string | number): string {
    if (value == null || value === '') return '';
    const cleaned = String(value).replace(/[^0-9]/g, '');
    const num = parseInt(cleaned, 10);
    if (isNaN(num)) return '';
    return num.toLocaleString('de-CH');
}

/**
 * Remove formatting (spaces, apostrophes, dollar signs) leaving digits only.
 */
export function unformatNumber(value?: string): string {
    if (value == null) return '';
    return String(value).replace(/[^0-9]/g, '');
}
