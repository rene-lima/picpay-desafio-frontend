import * as moment from "moment"

export function serialize(obj) {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
}

export function copy(toBeCloned) {
    return toBeCloned ? JSON.parse(JSON.stringify(toBeCloned)) : toBeCloned
}

// FILTERS
export function convertDateToBRFormat(date, fomart = 'DD MMM YYYY') {
    moment.locale('pt-br')
    return moment(date).format(fomart)
}

export function convertDateToUsFormat(date) {
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

export function convertDateToUTCFormat(date, hour) {
    const fullDate = `${convertDateToUsFormat(date)}T${hour ? hour : '00:00'}:00.000Z`

    return new Date(fullDate).toISOString()
}

export function convertHours(date, format = 'hh:mm A') {
    return moment.utc(date).format(format)
}

export function currencyFormat(value, locale = 'pt-BR') {
    if (!value && value !== 0) { return '' }
    if (typeof value !== 'number') {
        value = parseFloat(value)
    }
    return value.toLocaleString(locale, { style: 'currency', currency: 'BRL' })
}
