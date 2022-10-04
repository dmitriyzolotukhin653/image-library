import { FC } from "react";
import { useSelector } from "react-redux";

import { imagesSelector } from "../../redux/selectors/gallery.selectors";
import ImageCard from "./ImageCard";

const Gallery: FC = () => {
  const images = useSelector(imagesSelector);

  return (
    <div className="gallery">
      <div className="gallery__images">
        {images.map((image) => (
          <ImageCard image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
