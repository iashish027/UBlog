import { configureStore, combineReducers } from "@reduxjs/toolkit";
import signinReducer from "./signin/signinSlice";
import signupReducer from "./signup/signupSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import themeReducer from "./theme/themeSlice";

const signinFilter = createFilter("signin", ["currentUser"]); // Only persist currentUser
const signupFilter = createFilter("signup", []); // Example for signup

const rootReducer = combineReducers({
  signin: signinReducer,
  signup: signupReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  transforms: [signinFilter, signupFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
