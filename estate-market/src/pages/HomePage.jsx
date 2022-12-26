import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {getFlatsAction} from "../store/flats/flat_actions";
import {useAppDispatch, useAppSelector} from "../store";
import {axiosInstance} from "../api/axios_instance";
import {setAds} from "../store/ads/ad_reducer";
import {Ad} from "../components/Ad";

export const HomePage = () => {
    const dispatch = useAppDispatch()
    const {ads} = useAppSelector((store) => store.ad);

    const [q, setQ] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [value, setValue] = useState({});

    useEffect(() => {
        const fetchAds = async () => {
            await axiosInstance
                .get('/Ads/', {params: value})
                .then((response) => dispatch(setAds({ads: response?.data})));
        };
        fetchAds();
    }, [dispatch, value]);

    return (<div>
            <p>Добро пожаловать в Estate Market!</p>
            <div className='m-8'>
                <div>
                    <p>Название</p>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder='Введите название...'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <div>
                    <p>Минимальная цена</p>
                    <input
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <div>
                    <p>Максимальная цена</p>
                    <input
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <button onClick={() => setValue({q, min_price: minPrice, max_price: maxPrice})}>Искать</button>
            </div>

            {ads &&
                <div style={{display: "flex", flexDirection: "column"}}> {
                    ads.map((ad) => (
                            <Ad key={ad.AdID} {...ad}/>
                        )
                    )
                } </div>
            }
        </div>
    );
}