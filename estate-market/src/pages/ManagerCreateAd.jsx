import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Form, Field} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {createAdRequest, setAd} from "../store/ads/ad_reducer";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../api/axios_instance";

export const ManagerCreateAd = () => {
    const dispatch = useDispatch();

    const handleEmptySubmit = useCallback(() => undefined, []);

    const navigate = useNavigate();

    const handleFormSubmit = useCallback(
        (form, values) => () => {
            dispatch(
                createAdRequest({
                    ...values,
                })
            );
            form.reset();
            navigate("/")
        }, [dispatch]);

    const [value, setValue] = useState([]);

    useEffect(() => {
        const newValues = axiosInstance.get('Sellers/')
            .then((response) => response?.data)
            .then((newValues) => newValues && setValue(newValues));
    }, []);

    const renderedOptions = useMemo(() => {
        return value?.map((seller) =>
            <option value={seller?.SellerID}>{seller?.FirstName + ' ' + seller?.LastName}</option>
        )
    }, [value]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Form onSubmit={handleEmptySubmit}>
                {({form, values, handleSubmit}) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <h1 className="text-2xl font-bold">Редактирование объявления</h1>
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
                                    <select
                                        {...input_fields}
                                    >
                                        <option value="true">Да</option>
                                        <option value="false">Нет</option>
                                    </select>
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
                        <div className="flex flex-row gap-4 justify-between">
                            <label>Продавец</label>
                            <Field name="SellerID">
                                {({input: input_fields}) => (
                                    <select
                                        {...input_fields}
                                    >
                                        {renderedOptions}
                                    </select>
                                )}
                            </Field>
                        </div>
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            type="button" disabled={false} onClick={handleFormSubmit(form, values)}>
                            Добавить
                        </button>
                    </form>)
                }
            </Form>
        </div>
    );

}