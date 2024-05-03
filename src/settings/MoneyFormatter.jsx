import React from 'react'

export default function MoneyFormatter({ amount = 0 }) {
    let convert = amount;
    convert = Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (convert < 0) {
        convert = `(${convert})`
    }
    return (
        '\u{20B1} ' + convert
    )
}

export function NumberFormatter({ amount }) {
    return Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
