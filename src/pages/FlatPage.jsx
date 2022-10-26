import React from 'react'
import {useParams} from "react-router";
import {Flat} from "../components/Flat"
import {Link} from "react-router-dom";

export const FlatPage = (props) => {
    const {id} = useParams()
    const flat = props.flats.filter(flat => flat.id === +id)
    return (
        flat[0] ?
            <div>
                <Link to="/">На главную</Link>
                <Flat flat={flat[0]}/>
            </div> :
            <h1>Квартира не найдена</h1>
    )
}