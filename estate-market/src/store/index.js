import {useDispatch, useSelector} from "react-redux"
import {configureStore} from "@reduxjs/toolkit";
import {adReducer} from "./ads/ad_reducer";
import {userReducer} from "./users/user_reducer";
import {userAppReducer} from "./apps/user_app_reducer";
import {managerAppReducer} from "./apps/manager_app_reducer";


export const makeStore = () =>
    configureStore({
        reducer: {
            ad: adReducer,
            user: userReducer,
            userApps: userAppReducer,
            managerApps: managerAppReducer
        }
    });

const store = makeStore();

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
