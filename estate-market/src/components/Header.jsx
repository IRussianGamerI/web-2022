import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {logout} from "../store/users/user_reducer";

export const Header = () => {
    const {authorized, user} = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        !authorized ? navigate('/auth') : dispatch(logout());
    }
    return (<div className='flex justify-between w-full h-16 items-center border-b px-10'>
        <Link to='/' className='font-semibold text-2xl text-green-700'>
            Estate Market
        </Link>
        <div className='flex gap-4'>
            {authorized && <Link to='/cart'>Корзина</Link>}
            {authorized && user?.username && <p>{user.username}</p>}
            {!location.pathname.includes('auth') && (
                <button onClick={handleClick}>{authorized ? 'Выйти' : 'Войти'}</button>
            )}
        </div>
    </div>);
    /*return (
        <div style={{display: "flex", width: "100vw", justifyContent: "center", gap: "20px"}}>
            <Link to="/">Домашняя</Link>
            <Link to="new">Новая</Link>
        </div>
    )*/
}