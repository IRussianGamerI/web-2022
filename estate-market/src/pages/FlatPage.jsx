import React, {useEffect} from 'react'
import {Link} from "react-router-dom"
import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../store";
import {resetFlatState} from "../store/flats/flat_reducer";
import {getFlatByIdAction} from "../store/flats/flat_actions";
import {Flat} from "../components/Flat";

export const FlatPage = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const {flat: flat_obj} = useAppSelector((store) => store.flat);

    useEffect(() => {
        if (!flat_obj && params.id) {
            dispatch(getFlatByIdAction(params.id));
        }
    }, [flat_obj, dispatch, params.id]);

    useEffect(
        () => () => {
            dispatch(resetFlatState());
        }, [dispatch]
    )


    return (
        flat_obj ?
            <div>
                <Link to="/">На главную</Link>
                <Flat flat={flat_obj}/>
            </div> :
            <h1>Квартира не найдена</h1>
    )
}