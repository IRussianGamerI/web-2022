import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import axiosInstance from '../api/axios_instance';
import {setApplications} from '../store/apps/user_app_reducer';

export const CartPage = () => {
    const {apps: applications} = useSelector((store) => store.userApps);
    const {authorized, user} = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApps = async () => {
            const values = {id: user.id};
            await axiosInstance
                .get('ExpandedApps/', {params: values})
                .then((response) => dispatch(setApplications(response?.data)));
        };
        authorized ? fetchApps() : navigate('/');
    }, [authorized, dispatch, navigate, user.id]);

    const handleDelete = (id) => {
        const fetchDelete = async (id) => {
            await axiosInstance
                .patch(`Applications/${id}/`, {StatusID: 4})
                .then(
                    async () =>
                        await axiosInstance.get('ExpandedApps/', {params: {id: user.id}}).then((response) =>
                            dispatch(setApplications(response?.data)))
                );
        };
        fetchDelete(id);
    };

    const handleContact = (id) => {
        const fetchContact = async (id) => {
            await axiosInstance
                .patch(`Applications/${id}/`, {StatusID: 2})
                .then(
                    async () =>
                        await axiosInstance.get('ExpandedApps/', {params: {id: user.id}}).then((response) =>
                            dispatch(setApplications(response?.data)))
                );
        };
        fetchContact(id);
    }

    const handleFinish = (id) => {
        const fetchFinish = async (id) => {
            await axiosInstance
                .patch(`Applications/${id}/`, {StatusID: 5})
                .then(
                    async () =>
                        await axiosInstance.get('ExpandedApps/', {params: {id: user.id}}).then((response) =>
                            dispatch(setApplications(response?.data)))
                );
        };
        fetchFinish(id);
    }

    const handleCancelFinish = (id) => {
        const fetchCancelFinish = async (id) => {
            await axiosInstance
                .patch(`Applications/${id}/`, {StatusID: 3})
                .then(
                    async () =>
                        await axiosInstance.get('ExpandedApps/', {params: {id: user.id}}).then((response) =>
                            dispatch(setApplications(response?.data)))
                );
        };
        fetchCancelFinish(id);
    }

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <div className='flex gap-1 hover:bg-amber-300'>
                    <Link to='/'>Главная</Link>
                </div>
                <p>/</p>
                <div className='flex gap-1 hover:bg-amber-300'>
                    <Link to='#'>Избранное и заявки</Link>
                </div>
            </div>
            {applications &&
                <ul className="flex flex-row">
                    {applications?.length === 0 ? <p> Корзина пуста </p> : null}
                    {applications?.map((note) => (
                        <li key={note.id} className='p-4 m-4 bg-gray-300 w-[400px] rounded-xl'>
                            <img src={note?.AdID?.Photo} alt={note?.AdID?.Title} className='w-96'/>
                            <p className="flex flex-row">
                                <strong className="mr-2">Статус:</strong>
                                <p className="font-bold text-blue-700"> {note?.StatusID.Name} </p>
                            </p>
                            <p>
                                <strong>Название: </strong> {note?.AdID?.Title}
                            </p>
                            <p>
                                <strong>Стоимость: </strong> {note?.AdID?.Price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽'}
                            </p>
                            <p>
                                <strong>Адрес: </strong> {note?.AdID?.Address}
                            </p>
                            <p>
                                <strong>Площадь: </strong> {note?.AdID?.Area} м<sup>2</sup>
                            </p>
                            <p>
                                <strong>Число комнат: </strong> {note?.AdID?.RoomNum}
                            </p>
                            <p>
                                <strong>Этаж: </strong> {note?.AdID?.Floor}
                            </p>
                            <p>
                                <strong>Балкон: </strong> {note?.AdID?.Balcony ? 'Есть' : 'Нет'}
                            </p>
                            {note?.StatusID?.StatusID === 3 || note?.StatusID?.StatusID === 5 ?
                                <div>
                                    <p className="flex flex-col items-center mr-8">
                                        <strong>Данные продавца</strong>
                                    </p>
                                    <p>
                                        <strong>Телефон продавца:</strong> {note?.AdID?.SellerID?.Telephone}
                                    </p>
                                    <p>
                                        <strong>Имя продавца: </strong>
                                        {note?.AdID?.SellerID?.FirstName} {note?.AdID?.SellerID?.LastName}
                                    </p>
                                </div>
                                : null
                            }
                            {note?.StatusID?.StatusID === 1 && <button
                                className='bg-red-400 hover:bg-red-700 w-full rounded-xl text-white font-bold py-1 mt-2'
                                onClick={() => handleContact(note.id)}
                            >
                                Запросить контакты продавца
                            </button>}
                            {note?.StatusID?.StatusID < 4 && <button
                                className='bg-blue-400 hover:bg-blue-700 w-full rounded-xl mt-2 py-1 text-white'
                                onClick={() => handleDelete(note.id)}
                            >
                                Удалить
                            </button>}
                            {note?.StatusID?.StatusID === 3 && <button
                                className='bg-red-400 hover:bg-red-700 w-full rounded-xl mt-2 py-1 text-white'
                                onClick={() => handleFinish(note.id)}
                            >
                                Запросить завершение заявки
                            </button>}
                            {note?.StatusID?.StatusID === 5 && <button
                                className='bg-green-400 hover:bg-green-700 w-full rounded-xl mt-2 py-1 text-white'
                                onClick={() => handleCancelFinish(note.id)}
                            >
                                Отказаться от завершения
                            </button>}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};