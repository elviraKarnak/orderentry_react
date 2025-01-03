import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session'; // Use sessionStorage
import { thunk } from 'redux-thunk';
import { encryptTransform } from 'redux-persist-transform-encrypt';


///////////////////// declare all Reducer  //////////////////////////
import authReducer from './reducers/Auth';
import commonReducer from './reducers/Common';
import orderEntryReducer from './reducers/OrderEntry';
import customerReducer from './reducers/Customer';
///////////////////// End declare all Reducer  /////////////////////



const encryptionKey = '5e0e3cbf6e9b3c25f1f3c2c684d0f929';
const encryptor = encryptTransform({
    secretKey: encryptionKey,
    onError: function (error) {
        // Handle encryption errors here 
        console.error('Encryption error: ', error);
    },
});


const persistConfig = {
    key: 'root',
    storage: storageSession,
    transforms: [encryptor],
};


///////////////////// write all Reducer  ///////////////////////
const rootReducer = combineReducers({
    Auth: authReducer,
    Common: commonReducer,
    OrderEntry: orderEntryReducer,
    Customer: customerReducer,
});
///////////////////// End write all Reducer ///////////////////


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [
        thunk,
    ],
});


export const persistor = persistStore(store);