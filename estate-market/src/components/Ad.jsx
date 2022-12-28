import React from "react";
import {useNavigate} from "react-router-dom";

export const Ad = (props) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/ad/${props.AdID}`);
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
                <strong>Цена:</strong> {props?.Price}
            </p>
            <p>
                <strong>Описание:</strong> {props?.Description}
            </p>
        </div>
    );
}