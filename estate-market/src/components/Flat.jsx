import React from 'react'

export const Flat = ({flat}) => {
    return (
        <div>
            <p>{flat.title}</p>
            <p>{flat.description}</p>
            <p>Адрес:   {flat.address}</p>
            <p>Этаж:    {flat.floor}</p>
            <p>Площадь: {flat.area} кв.м</p>
            <p>Балкон:  {flat.balcony ? 'Да' : 'Нет'}</p>
        </div>
    )
}