import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from '../api/axios_instance';
import { setAd } from '../store/ads/ad_reducer';

export const AdPage = () => {
    const dispatch = useDispatch();
    const { ad } = useSelector((store) => store.ad);
    const { id } = useParams();
    const { authorized } = useSelector((store) => store.user);

    const handleClick = () => {
        const addCart = async () => {
            const values = {
                Status: 'Добавлено в корзину',
                AdID: +id,
                CustomerID: 1,
            };
            const response = await axiosInstance.post('Basket/', values);
            console.log(response);
        };
        addCart();
    };

    useEffect(() => {
        const fetchAd = async () => {
            await axiosInstance.get(`/Ads/${id}`).then((response) => dispatch(setAd(response?.data)));
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
                <div className='p-8 rounded-xl bg-gray-300 min-w-[400px] max-w-[50vh] flex flex-col justify-center items-start cursor-pointer mt-8'>
                    <img src={ad.AdID + ".jpg"} alt={ad.Title} />
                    <p>
                        <strong>Название:</strong> {ad.Title}
                    </p>
                    <p>
                        <strong>Описание:</strong> {ad.Description}
                    </p>
                    <p>
                        <strong>Стоимость:</strong> {ad.Price}
                    </p>
                    {authorized && (
                        <button className='bg-blue-400 w-full rounded-xl mt-2 py-1 text-white' onClick={handleClick}>
                            Добавить в корзину/избранное
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};