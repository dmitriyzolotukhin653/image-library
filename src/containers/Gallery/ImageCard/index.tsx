import { FC } from "react";
import { Card, Image } from "antd";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { IImage } from "../../../api/types";
import { AppDispatch } from "../../../redux/state";
import { deleteImage } from "../../../redux/slices/gallery.slice";
import { useSwitch } from "../../../utils/hooks/switch";
import EditImageModal from "../Modals/EditImageModal";

type ImageCardProps = {
  image: IImage;
};

const ImageCard: FC<ImageCardProps> = ({ image }) => {
  const [editModalOpened, openEditModal, closeEditModal] = useSwitch();

  const dispatch: AppDispatch = useDispatch();

  const handleCardDeleteClick = () => {
    dispatch(deleteImage(image.id));
  };

  return (
    <Card
      title={image.title}
      hoverable
      extra={
        <div className="gallery__images__card__controls">
          <EditOutlined onClick={openEditModal} />
          <DeleteOutlined onClick={handleCardDeleteClick} />
        </div>
      }
      className="gallery__images__card"
    >
      <Image src={image.base64Image} alt={image?.description || "image"} />
      <p>{image.description}</p>
      {editModalOpened && (
        <EditImageModal onClose={closeEditModal} image={image} />
      )}
    </Card>
  );
};

export default ImageCard;
