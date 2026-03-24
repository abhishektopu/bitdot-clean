export const currencySymbol = (currency) => {
    try {
        currency = currency.toUpperCase()
        if (currency == 'USD' || currency == 'USDT') return "$";
        if (currency == 'INR') return "₹";
        if (currency == 'EUR') return "€";
        return currency
    } catch (err) {
        return ''
    }
}