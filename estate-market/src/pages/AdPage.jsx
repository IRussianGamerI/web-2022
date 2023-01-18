import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {axiosInstance} from '../api/axios_instance';
import {setAd} from '../store/ads/ad_reducer';

export const AdPage = () => {
    const dispatch = useDispatch();
    const {ad} = useSelector((store) => store.ad);
    const {id} = useParams();
    const {authorized, user} = useSelector((store) => store.user);
    const navigate = useNavigate();

    const handleClick = () => {
        const addCart = async () => {
            const values = {
                Status: 'Добавлено в корзину',
                AdID: +id,
                UserID: user.id,
            };
            console.log(values);
            const response = await axiosInstance.post('Applications/', values);
        };
        addCart();
    };

    useEffect(() => {
        const fetchAd = async () => {
            await axiosInstance.get(`/Ads/${id}/`).then((response) => dispatch(setAd(response?.data)));
        };
        fetchAd();
    }, [dispatch, id]);
    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>{'Главная'}</Link> <p>/</p>
                <Link to='#'>{ad.Title}</Link>
            </div>
            {!!ad && (
                <div
                    className='p-8 rounded-xl bg-gray-300 min-w-[400px] max-w-[50vh] flex flex-col justify-center items-start cursor-pointer mt-8'>
                    <img src={ad.Photo} alt={ad.Title}/>
                    <p>
                        <strong>Название:</strong> {ad.Title}
                    </p>
                    <p>
                        <strong>Описание:</strong> {ad.Description}
                    </p>
                    <p>
                        <strong>Адрес:</strong> {ad.FlatID?.Address}
                    </p>
                    <p>
                        <strong>Площадь:</strong> {ad.FlatID?.Area + ' кв.м'}
                    </p>
                    <p>
                        <strong>Этаж:</strong> {ad.FlatID?.Floor}
                    </p>
                    <p>
                        <strong>Балкон:</strong> {ad.FlatID?.Balcony ? 'Есть' : 'Нет'}
                    </p>
                    <p>
                        <strong>Материал дома:</strong> {ad.FlatID?.BuildTech}
                    </p>
                    <p>
                        <strong>Стоимость:</strong> {ad.Price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' ₽'}
                    </p>
                    {authorized && (
                        <button className='bg-blue-400 w-full rounded-xl mt-2 py-1 text-white' onClick={handleClick}>
                            Добавить в избранное
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};