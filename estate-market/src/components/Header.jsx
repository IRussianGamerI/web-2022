import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {setAuth} from "../store/users/user_reducer";

export const Header = () => {
    const {authorized} = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(setAuth());
    }
    return (<div className='flex justify-between m-4'>
        <Link to='/' className='font-semibold text-2xl text-green-700'>
            Estate Market
        </Link>
        <div>
            {authorized && <Link to='/cart'>Корзина</Link>}
            <button style={{marginLeft: '12px'}} onClick={handleClick}>
                {authorized ? 'Выйти' : 'Войти'}
            </button>
        </div>
    </div>);
    /*return (
        <div style={{display: "flex", width: "100vw", justifyContent: "center", gap: "20px"}}>
            <Link to="/">Домашняя</Link>
            <Link to="new">Новая</Link>
        </div>
    )*/
}