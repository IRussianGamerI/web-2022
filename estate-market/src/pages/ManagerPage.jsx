import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import axiosInstance from "../api/axios_instance";
import {ManagerApplication} from "../components/ManagerApplication";
import {setApplications} from "../store/apps/manager_app_reducer";
import dayjs from "dayjs";


export const ManagerPage = () => {
    const dispatch = useDispatch();
    const {apps} = useSelector((store) => store.managerApps);
    const [value, setValue] = useState([]);

    const [status, setStatus] = useState('0');

    const [minDateAdded, setMinDateAdded] = useState(dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
    const [maxDateAdded, setMaxDateAdded] = useState(dayjs().add(1, "day").format('YYYY-MM-DD'));

    const [minLastAction, setMinLastAction] = useState(dayjs().subtract(1, 'month').format('YYYY-MM-DD'));
    const [maxLastAction, setMaxLastAction] = useState(dayjs().add(1,  "day").format('YYYY-MM-DD'));

    const [query, setQuery] = useState({});

    useEffect(() => {
        const fetchApps = async () => {
            await axiosInstance.get('ManagerApps/', {params: {query, StatusID: status}}).then((response) => dispatch(setApplications(response?.data)));
        };
        fetchApps();
    }, [dispatch, query, status]);

    useEffect(() => {
        const newValues = axiosInstance.get('Statuses/')
            .then((response) => response?.data)
            .then((newValues) => newValues && setValue(newValues));
    }, []);

    const renderedOptions = useMemo(() => {
        return value?.map((status) =>
            <option value={status?.StatusID}>{status?.Name}</option>
        )
    }, [value]);

    return (
        <div className="p-8 flex flex-col gap-4">
            <div className="flex gap-1">
                <Link to="/">Главная</Link> <p>/</p>
                <Link to="#">Панель менеджера</Link>
            </div>
            <select className="border border-gray-300 rounded-md p-2" onChange={(e) => setStatus(e.target.value)}>
                <option disabled={true} selected={true}>Фильтрация по статусу</option>
                <option value={0}>Все</option>
                {renderedOptions}
            </select>

            <div className='m-8'>
                <div>
                    <p>Минимальная дата добавления</p>
                    <input
                        value={minDateAdded}
                        onChange={(e) => setMinDateAdded(e.target.value)}
                        placeholder='Введите значение...'
                        type='date'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <div>
                    <p>Максимальная дата добавления</p>
                    <input
                        value={maxDateAdded}
                        onChange={(e) => setMaxDateAdded(e.target.value)}
                        placeholder='Введите значение...'
                        type='date'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <div>
                    <p>Минимальная дата изменения</p>
                    <input
                        value={minLastAction}
                        onChange={(e) => setMinLastAction(e.target.value)}
                        placeholder='Введите значение...'
                        type='date'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <div>
                    <p>Максимальная дата изменения</p>
                    <input
                        value={maxLastAction}
                        onChange={(e) => setMaxLastAction(e.target.value)}
                        placeholder='Введите значение...'
                        type='date'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-200 outline-none placeholder-gray-700'
                    />
                </div>
                <button onClick={() => setQuery({
                    min_da: minDateAdded,
                    max_da: maxDateAdded,
                    min_la: minLastAction,
                    max_la: maxLastAction
                })}>Искать
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {apps?.map((app) => <ManagerApplication key={app?.id} {...app}/>)}
            </div>
        </div>
    );
};
