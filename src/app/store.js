import { configureStore } from "@reduxjs/toolkit";
import customerReducer from '../features/customers/customerSlice';
import userReducer from '../features/user/userSlice';
// import authReducer from '../features/auth/authSlice';
import modalReducer from '../features/modal/modalSlice';
// import drawerReducer from '../features/drawer/drawerSlice';

import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';

// customer api trial
import { customerApiSlice } from "../features/customers/customerApiSlice";

import salesReducer from '../features/sales/salesSlice';
import denominationReducer from "../features/utils/denominationSlice";

// For persisting state
import storage from "redux-persist/lib/storage";
import {
    persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

// For persisting state
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
const persistSalesConfig = {
    key: 'root',
    version: 1,
    storage,
}

const persistUnitConfig = {
    key: 'unit',
    version: 2,
    storage,
}

const salesPersistReducer = persistReducer(persistSalesConfig, salesReducer);
const unitPersistReducer = persistReducer(persistSalesConfig, denominationReducer);

export const store = configureStore({
    reducer: {
        // customer: customerReducer,
        // user: userReducer,
        // [apiSlice.reducerPath]: apiSlice.reducer,
        sales: salesPersistReducer,
        denomination: unitPersistReducer,
        auth: authReducer,
        modal: modalReducer,
        drawer: drawerReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(apiSlice.middleware),
    devTools: true
})

export const persistor = persistStore(store);