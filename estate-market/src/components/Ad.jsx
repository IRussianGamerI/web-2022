import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const Ad = (props) => {
    const {user, authorized} = useSelector((store) => store.user);

    const navigate = useNavigate();
    const handleNavigate = () => {
        if (authorized && user?.is_staff) {
            navigate(`/manager_ad/${props.AdID}`);
        } else {
            navigate(`/ad/${props.AdID}`);
        }
    };
    return (
        <div
            onClick={handleNavigate}
            className="p-8 rounded-xl bg-gray-300 min-w-[400px] max-w-[50vh] flex flex-col cursor-pointer my-8"
        >
            <img src={props?.Photo} alt={props?.Title}/>
            <p>
                <strong>Название:</strong> {props?.Title}
            </p>
            <p>
                <strong>Цена (руб.):</strong> {props?.Price}
            </p>
            <p>
                <strong>Описание:</strong> {props?.Description}
            </p>
            {authorized && user?.is_staff &&
                <p>
                    <strong>Статус:</strong> {props?.Active ? 'Активно' : 'Скрыто'}
                </p>
            }
        </div>
    );
}