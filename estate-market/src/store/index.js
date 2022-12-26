import {useDispatch, useSelector} from "react-redux"
import {configureStore} from "@reduxjs/toolkit";
import {adReducer} from "./ads/ad_reducer";
import {userReducer} from "./users/user_reducer";
import {basketReducer} from "./basket/basket_reducer";


export const makeStore = () =>
    configureStore({
        reducer: {
            ad: adReducer,
            user: userReducer,
            basket: basketReducer
        }
    });

const store = makeStore();

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;