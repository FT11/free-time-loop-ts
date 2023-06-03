import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterStore';
import { pokemonApi } from '../services/pokemon';

const middlewareArray = [pokemonApi.middleware];


export default configureStore({
  reducer: {
    ...counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    middlewareArray
  ),
});
