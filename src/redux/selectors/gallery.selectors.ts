import {RootState} from "../state";
import {createDraftSafeSelector} from "@reduxjs/toolkit";

export const imagesSelector = (state: RootState) => state.gallery.images;

export const currentPageSelector = (state: RootState) =>
    state.gallery.currentPage;

export const searchSelector = (state: RootState) =>
    state.gallery.searchString;

export const searchImagesSelector = createDraftSafeSelector(
    imagesSelector,
    searchSelector,
    (images, search) => search ? images.filter(image => image.title.includes(search)) : images
);

export const visibleImagesSelector = createDraftSafeSelector(
    searchImagesSelector,
    currentPageSelector,
    (images, currentPage) => {
        console.log({images, currentPage})
        return images.slice((currentPage - 1) * 5, currentPage * 5)
    }
);
