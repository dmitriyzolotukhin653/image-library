import { combineReducers } from "@reduxjs/toolkit";

import galleryReducer from "./slices/gallery.slice";

export const rootReducer = combineReducers({
  gallery: galleryReducer,
});
