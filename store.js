import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer, healthDataReducer } from './reducer';

// Define the persistConfig
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer, healthDataReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
