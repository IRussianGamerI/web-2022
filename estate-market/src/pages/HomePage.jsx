import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../store";
import {axiosInstance} from "../api/axios_instance";
import {setAds} from "../store/ads/ad_reducer";
import {Ad} from "../components/Ad";
import {Link, useNavigate} from "react-router-dom";

export const HomePage = () => {
    const dispatch = useAppDispatch()
    const {ads} = useAppSelector((store) => store.ad);

    const {user, authorized} = useAppSelector((store) => store.user);

    const [q, setQ] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [value, setValue] = useState({});

    const [showAll, setShowAll] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAds = async () => {
            await axiosInstance
                .get('/Ads/', {params: Object.assign({}, value, {show_all: showAll})})
                .then((response) => dispatch(setAds({ads: response?.data})));
        };
        fetchAds();
    }, [dispatch, value, showAll]);

    return (<div>
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
                {authorized && user?.is_staff &&
                    <div className="flex flex-row items-start">
                        <button
                            className="my-8 mr-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => setValue({q, min_price: minPrice, max_price: maxPrice})}>
                            Искать
                        </button>
                        <button
                            className="my-8 mr-4 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => setShowAll(!showAll)}>
                            {!showAll ? "Показать все" : "Скрыть неактивные"}
                        </button>
                        <button
                            className="my-8 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => {
                                navigate('/add_ad');
                            }}>
                            Добавить объявление
                        </button>
                    </div>
                }
            </div>

            {ads &&
                <div className="m-8" style={{display: "flex", flexDirection: "column"}}> {
                    ads.map((ad) => (
                            <Ad key={ad.AdID} {...ad}/>
                        )
                    )
                } </div>
            }
        </div>
    );
}