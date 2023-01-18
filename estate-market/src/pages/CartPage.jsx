import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../api/axios_instance';
import {setBasket} from '../store/basket/basket_reducer';

export const CartPage = () => {
    const {basket} = useSelector((store) => store.basket);
    const {authorized, user} = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchBasket = async () => {
            const values = {id: user.id};
            await axiosInstance
                .get('ExpandedBasket/', {params: values})
                .then((response) => dispatch(setBasket(response?.data)));
        };
        authorized ? fetchBasket() : navigate('/');
    }, [authorized, dispatch, navigate, user.id]);

    const handleDelete = (id) => {
        const fetchDelete = async (id) => {
            await axiosInstance
                .delete(`Basket/${id}/`)
                .then(
                    async () =>
                        await axiosInstance.get('ExpandedBasket/').then((response) => dispatch(setBasket(response?.data)))
                );
        };
        fetchDelete(id);
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>Главная</Link> <p>/</p>
                <Link to='#'>Корзина</Link>
            </div>
            <ul>
                {basket.length === 0 ? <p> Корзина пуста </p> : basket.map((note) => (
                    <li key={note.id} className='p-4 m-4 bg-gray-300 w-[400px] rounded-xl'>
                        <img src={note?.AdID.Photo} alt={note?.AdID.Title} className='w-96'/>
                        <p>Статус: {note?.Status}</p>
                        <p>Название: {note?.AdID.Title}</p>
                        <p>Стоимость: {note?.AdID.Price}</p>
                        <button
                            className='bg-blue-400 w-full rounded-xl mt-2 py-1 text-white'
                            onClick={() => handleDelete(note.id)}
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};