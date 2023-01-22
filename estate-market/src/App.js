import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage"
import {NewPage} from "./pages/NewPage";
import {AdPage} from "./pages/AdPage";
import {Header} from "./components/Header";
import {CartPage} from "./pages/CartPage";
import {useDispatch, useSelector} from "react-redux";
import {axiosInstance} from "./api/axios_instance";
import {setUser} from "./store/users/user_reducer";
import {AuthPage} from "./pages/AuthPage";
import {ManagerPage} from "./pages/ManagerPage";
import {ManagerApplication} from "./components/ManagerApplication";
import {ManagerEditAd} from "./pages/ManagerEditAd";
import {ManagerCreateAd} from "./pages/ManagerCreateAd";

function App() {
    const dispatch = useDispatch();
    const {user, authorized} = useSelector((store) => store.user);
    useEffect(() => {
        const getUser = async () => {
            const values = {id: user.id};
            await axiosInstance.get('api/user', {params: values}).then((response) => dispatch(setUser(response?.data)));
        };
        if (authorized || localStorage.getItem('access')) {
            getUser();
        }
    }, [dispatch, authorized, user.id]);

    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                {!authorized && <Route path='/auth' element={<AuthPage/>}/>}
                {authorized && <Route path='/cart' element={<CartPage/>}/>}
                {authorized && user?.is_staff ? <Route path='/manager' element={<ManagerPage/>}/> : null}
                {authorized && user?.is_staff ? <Route path='/add_ad' element={<ManagerCreateAd/>}/> : null}
                <Route path="/new" element={<NewPage/>}/>
                <Route path="/ad/:id" element={<AdPage/>}/>
                {authorized && user?.is_staff ? <Route path="/manager_ad/:id" element={<ManagerEditAd/>}/> : null}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    );
}

export default App;