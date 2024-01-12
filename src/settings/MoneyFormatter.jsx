import React from 'react'

export default function MoneyFormatter({ amount }) {
    return (
        '\u{20B1} ' + Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    )
}

export function NumberFormatter({ amount }) {
    return Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
