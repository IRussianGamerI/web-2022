import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Form, Field} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {patchAdRequest, setAd} from "../store/ads/ad_reducer";
import axiosInstance from "../api/axios_instance";
import {useLocation, useNavigate} from "react-router-dom";
import {setApplications} from "../store/apps/user_app_reducer";

export const ManagerEditAd = () => {
    const dispatch = useDispatch();

    const handleEmptySubmit = useCallback(() => undefined, []);

    const {ad} = useSelector((store) => store.ad);

    const location = useLocation();

    const navigate = useNavigate();

    const handleFormSubmit = useCallback(
        (form, values) => () => {
            dispatch(
                patchAdRequest({
                    AdID: location.pathname.split("/").slice(-1)[0],
                    ...values,
                })
            );
            form.reset();
        }, [dispatch, location.pathname]);

    const handleChangeActive = useCallback(
        (id) => () => {
            const fetchChangeActive = async () => {
                await axiosInstance
                    .patch(`Ads/${id}/`, {Active: !ad?.Active})
                    .then(async () => await axiosInstance.get(`Ads/${id}/`).then((response) =>
                        dispatch(setAd(response?.data))));
            };
            fetchChangeActive();
        }, [dispatch, ad]);

    const handleDelete = useCallback(
        (id) => () => {
            const fetchDelete = async (id) => {
                await axiosInstance
                    .delete(`Ads/${id}/`)
                    .then(
                        async () => navigate("/")
                    );
            };
            fetchDelete(id);
        }, [navigate]);

    useEffect(() => {
        const fetchAd = async () => {
            await axiosInstance
                .get(`/Ads/${location.pathname.split("/").slice(-1)[0]}/`)
                .then((response) => dispatch(setAd(response?.data)) && console.log(ad));
        };
        fetchAd();
        console.log(ad);
    }, [dispatch, location.pathname]);

    const initialValue = useMemo(() => {
        return {
            Title: ad?.Title,
            Description: ad?.Description,
            Price: ad?.Price,
            Address: ad?.Address,
            Area: ad?.Area,
            Floor: ad?.Floor,
            Balcony: ad?.Balcony,
            RoomNum: ad?.RoomNum,
        };
    }, [ad]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Form onSubmit={handleEmptySubmit} initialValues={initialValue}>
                {({form, values, handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Редактирование объявления</h1>
                        <div className="flex flex-row justify-between gap-4">
                            <label>
                                <span>Статус: </span>
                            </label>
                            <label>
                                <span
                                    className="font-bold text-2xl text-blue-500">{ad?.Active ? "Активно" : "Неактивно"}</span>
                            </label>
                        </div>
                        {/*<Field name="Photo">*/}
                        {/*    {({input: input_fields}) => (*/}
                        {/*        <img src={ad?.Photo} alt={ad?.Title}/>*/}
                        {/*    )}*/}
                        {/*</Field>*/}
                        <div className="flex flex-row justify-between gap-4">
                            <label>
                                <span>Название</span>
                            </label>
                            <Field name="Title">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="text"
                                        placeholder="Название"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Описание</label>
                            <Field name="Description">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="text"
                                        placeholder="Описание"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Цена (руб.)</label>
                            <Field name="Price">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="number"
                                        placeholder="Цена"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Адрес</label>
                            <Field name="Address">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="text"
                                        placeholder="Адрес"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Площадь (кв. м)</label>
                            <Field name="Area">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="number"
                                        placeholder="Площадь"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Этаж</label>
                            <Field name="Floor">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="number"
                                        placeholder="Этаж"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Балкон</label>
                            <Field name="Balcony">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="boolean"
                                        placeholder="Балкон"
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Количество комнат</label>
                            <Field name="RoomNum">
                                {({input: input_fields}) => (
                                    <input
                                        {...input_fields}
                                        type="number"
                                        placeholder="Количество комнат"
                                    />
                                )}
                            </Field>
                        </div>
                        {/*<div className="flex flex-row gap-4 justify-between">*/}
                        {/*    <label>Фото</label>*/}
                        {/*    <Field name="Photo">*/}
                        {/*        {() => (*/}
                        {/*            <input*/}
                        {/*                type="file"*/}
                        {/*                placeholder="Фото"*/}
                        {/*            />*/}
                        {/*        )}*/}
                        {/*    </Field>*/}
                        {/*</div>*/}
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            type="button" disabled={false} onClick={handleFormSubmit(form, values)}>
                            Сохранить
                        </button>
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            type="button" disabled={false}
                            onClick={handleChangeActive(ad?.AdID)}>
                            {ad?.Active ? "Скрыть" : "Показать"}
                        </button>
                        <button
                            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            type="button" disabled={false}
                            onClick={handleDelete(ad?.AdID)}>
                            Удалить
                        </button>
                    </form>)
                }
            </Form>
        </div>
    );

}