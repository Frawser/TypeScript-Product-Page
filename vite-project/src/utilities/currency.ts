const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: 'SEK', style: 'currency' })



export function formatCurrency(value: number): string {
    return CURRENCY_FORMATTER.format(value)
    }