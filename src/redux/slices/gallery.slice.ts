import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IImage, ImageOperationData } from "../../api/types";

interface GalleryState {
  images: Array<IImage>;
  currentPage: number;
  searchString: string;
}

const initialState: GalleryState = {
  images: [],
  currentPage: 1,
  searchString: ''
};

const gallerySlice = createSlice({
  name: "gallery",
  reducers: {
    addImage: (state, action: PayloadAction<ImageOperationData>) => {
      state.images.push({ id: new Date().getTime(), ...action.payload });
    },
    editImage: (state, action: PayloadAction<Partial<ImageOperationData>>) => {
      const id = action.payload.id;
      const imageToUpdateData = state.images.findIndex(
        (image) => image.id === id
      );
      if (imageToUpdateData !== -1)
        state.images[imageToUpdateData] = {
          ...state.images[imageToUpdateData],
          ...action.payload,
        };
    },
    deleteImage: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const imageToDeleteIndex = state.images.findIndex(
        (image) => image.id === id
      );
      if (imageToDeleteIndex !== -1)
        state.images = [
          ...state.images.slice(0, imageToDeleteIndex),
          ...state.images.slice(imageToDeleteIndex + 1),
        ];
    },
    changePage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    changeSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
    },
  },
  initialState,
});

export const { addImage, editImage, deleteImage, changePage, changeSearchString } =
  gallerySlice.actions;

export default gallerySlice.reducer;
