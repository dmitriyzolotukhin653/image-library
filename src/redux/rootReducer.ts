import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import galleryReducer from "./slices/gallery.slice";

const persistGalleryConfig = {
  key: "gallery",
  whitelist: ["images"],
  storage,
};

export const rootReducer = combineReducers({
  gallery: persistReducer(persistGalleryConfig, galleryReducer),
});
