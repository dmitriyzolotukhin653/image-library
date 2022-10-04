import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IImage } from "../../api/types";

interface GalleryState {
  images: Array<IImage>;
}

const initialState: GalleryState = {
  images: [],
};

type ImageOperationData = {
  id?: number;
  title: string;
  base64Image: string;
  description?: string;
};

const gallerySlice = createSlice({
  name: "gallery",
  reducers: {
    addImage: (state, action: PayloadAction<ImageOperationData>) => {
      state.images.push({ id: state.images.length, ...action.payload });
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
  },
  initialState,
});

export const { addImage, editImage, deleteImage } = gallerySlice.actions;

export default gallerySlice.reducer;
