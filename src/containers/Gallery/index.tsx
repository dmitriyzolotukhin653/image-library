import { FC } from "react";
import { useSelector } from "react-redux";

import {
  imagesSelector,
  visibleImagesSelector,
} from "../../redux/selectors/gallery.selectors";
import ImageCard from "./ImageCard";
import GalleryPagination from "./GalleryPagination";

const Gallery: FC = () => {
  const images = useSelector(visibleImagesSelector);

  return (
    <div className="gallery">
      <div className="gallery__images">
        {images.map((image) => (
          <ImageCard image={image} key={image.id} />
        ))}
      </div>
      <GalleryPagination />
    </div>
  );
};

export default Gallery;
