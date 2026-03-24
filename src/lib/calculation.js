// import lib
import isEmpty from './isEmpty';

export const percentageCalculation = (price, percentage) => {
    price = parseFloat(price);
    percentage = parseFloat(percentage)

    if (!isEmpty(price)) {
        return price - (price * (percentage / 100))
    }
    return 0
}

export const balanceConvention = (balance, conventionAmt) => {
    balance = parseFloat(balance);
    conventionAmt = parseFloat(conventionAmt)
    if (!isEmpty(conventionAmt)) {
        return balance * conventionAmt
    }
    return 0
}

export const precentConvetPrice = (price, percentage) => {
    price = parseFloat(price);
    percentage = parseFloat(percentage)

    if (!isEmpty(price)) {
        return price * (percentage / 100)
    }
    return 0
}

export const interestByDays = (price, rate, days) => {
    price = parseFloat(price);
    rate = parseFloat(rate)
    days = parseFloat(days);

    if (!isEmpty(price) && !isEmpty(rate) && !isEmpty(days)) {
        return ((price * (rate / 100)) / days)
    }
    return 0
}


