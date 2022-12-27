import {configureStore} from '@reduxjs/toolkit';
import {adReducer} from './adsSlice';
import {cartReducer} from './cartSlice';

export const store = configureStore({reducer: {ad: adReducer, cart: cartReducer}});
