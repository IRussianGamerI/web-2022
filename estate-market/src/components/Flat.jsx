import React from 'react'

export const Flat = ({flat}) => {
    return (
        <div>
            <p>Адрес:   {flat?.Address}</p>
            <p>Этаж:    {flat?.Floor}</p>
            <p>Площадь: {flat?.Area} кв.м</p>
            <p>Балкон:  {flat?.Balcony ? 'Да' : 'Нет'}</p>
        </div>
    )
}