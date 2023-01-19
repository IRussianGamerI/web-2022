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
                .delete(`Applications/${id}/`)
                .then(
                    async () =>
                        await axiosInstance.get('ExpandedApps/').then((response) =>
                            dispatch(setApplications(response?.data)))
                );
        };
        fetchDelete(id);
    };

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
                <ul>
                    {applications?.length === 0 ? <p> Корзина пуста </p> : null}
                    {applications?.map((note) => (
                        <li key={note.id} className='p-4 m-4 bg-gray-300 w-[400px] rounded-xl'>
                            <img src={note?.AdID?.Photo} alt={note?.AdID?.Title} className='w-96'/>
                            <p>
                                <strong>Статус:</strong> {note?.StatusID.Name}
                            </p>
                            <p>
                                <strong>Название: </strong> {note?.AdID?.Title}
                            </p>
                            <p>
                                <strong>Стоимость: </strong> {note?.AdID?.Price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽'}
                            </p>
                            <button
                                className='bg-blue-400 w-full rounded-xl mt-2 py-1 text-white'
                                onClick={() => handleDelete(note.id)}
                            >
                                Удалить
                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
};