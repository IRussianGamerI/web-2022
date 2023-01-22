import React, {useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import {useDispatch} from "react-redux";
import {setApplications} from "../store/apps/manager_app_reducer";
import axiosInstance from "../api/axios_instance";

export const ManagerApplication = (props) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState([]);

    useEffect(() => {
        const newValues = axiosInstance.get('Statuses/', {params: {id: props?.StatusID?.StatusID}})
            .then((response) => response?.data)
            .then((newValues) => newValues && setValue(newValues));
    }, []);

    const renderedOptions = useMemo(() => {
        return value?.map((status) =>
            <option value={status?.StatusID}>{status?.Name}</option>
        )
    }, [value]);


    const handleUpdate = async (status) => {
        const values = {StatusID: status, DateLastAction: dayjs().format('YYYY-MM-DD HH:mm:ss')};
        if (status === 6) {
            values['DateFinished'] = dayjs().format('YYYY-MM-DD HH:mm:ss');
        }
        await axiosInstance.patch(`Applications/${props.id}/`, values)
            .then(async () => {
                if (status === 6) {
                    await axiosInstance.patch(`Ads/${props?.AdID?.AdID}/`, {Active: false});
                }
            })
            .then(async () => {
                await axiosInstance.get('ManagerApps/').then((response) => dispatch(setApplications(response?.data)));
            });
    };

    return (
        <div className='p-8 md:w-[1000px] border rounded-md flex flex-col md:flex-row gap-8 items-start'>
            <img src={props?.AdID?.Photo} alt={props?.AdID?.Title} className='w-96'/>
            <div>
                <p>Название: {props?.AdID?.Title}</p>
                <p>Стоимость: {props?.AdID?.Price}</p>
                <p>Пользователь: {props?.UserID?.email}</p>
                <p>Дата добавления: {dayjs(props?.DateAdded).format('DD.MM.YYYY HH:mm')}</p>
                <p>Дата изменения статуса: {dayjs(props?.DateLastAction).format('DD.MM.YYYY HH:mm')}</p>
                {props?.DateFinished ?
                    <p>Дата завершения: {dayjs(props?.DateFinished).format('YYYY.MM.DD HH:mm')}</p> : null}
                <br></br>
                <p>Текущий статус: {props?.StatusID?.Name}</p>
                {props?.StatusID?.StatusID !== 5 ?
                    <div>
                        <p>Изменить статус:</p>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => handleUpdate(e.target.value)}>
                            <option selected={true} disabled>Статус заявки</option>
                            {renderedOptions}
                        </select>
                    </div>
                    :
                    <button
                        className="my-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => handleUpdate(6)}
                    >Завершить и снять объявление с публикации</button>}
            </div>
        </div>
    );
};
