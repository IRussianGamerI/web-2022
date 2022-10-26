import React from 'react'
import {Link} from "react-router-dom";
import {flats} from "../flats";
import {useEffect, useState} from "react";

export const HomePage = () => {
    const [display, setDisplay] = useState(false)
    const [, setFlat] = useState(flats[0])
    useEffect(() => {
        setFlat(flats[Math.floor(Math.random() * flats.length)])
    }, [display])
    return <div>
        <div>
            <p>Добро пожаловать в Estate Market!</p>
            <button onClick={() => setDisplay((prev) => !prev)}>{display ? "Скрыть список" : "Показать список"}</button>
            {display && <div style={{display: "flex", flexDirection: "column"}}>
                {flats.map(flat => <Link to={`/flat/${flat.id}`}
                                         key={flat.id}>{flat.id}. {flat.title}</Link>)}
            </div>}
        </div>
    </div>
}