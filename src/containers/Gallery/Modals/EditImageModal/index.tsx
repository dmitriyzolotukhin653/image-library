import { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { FormProps } from "rc-field-form/lib/Form";

import { IImage } from "../../../../api/types";
import { AppDispatch } from "../../../../redux/state";
import { Button, Form, Input, Modal, Typography } from "antd";
import { toBase64 } from "../../../../utils/toBase64";
import { editImage } from "../../../../redux/slices/gallery.slice";
import FileUpload from "../../../../components/FileUpload";
import { AddImageModalFormProps } from "../AddImageModal";

type EditImageModalProps = {
  image: IImage;
  onClose: () => void;
};

const EditImageModal: FC<EditImageModalProps> = ({ image, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [changeImage, setImageChange] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm<AddImageModalFormProps>();

  const onBeforeUploadFile = useCallback(() => {
    form.setFields([{ name: "image", errors: [] }]);
  }, [form]);

  const onFileError = useCallback(
    (error: string) =>
      form.setFields([{ name: "image", errors: [error], validating: true }]),
    [form]
  );

  const handleFormSubmit: FormProps<AddImageModalFormProps>["onFinish"] =
    async (data) => {
      setConfirmLoading(true);
      const base64Image = data.image ? await toBase64(data.image) : null;
      dispatch(
        editImage({
          id: image.id,
          title: data.title,
          ...(base64Image ? { base64Image } : {}),
          ...(data.description ? { description: data.description } : {}),
        })
      );
      setConfirmLoading(false);
      onClose();
    };

  return (
    <Modal
      centered
      open={true}
      onCancel={onClose}
      confirmLoading={confirmLoading}
      onOk={form.submit}
    >
      <Form
        layout="horizontal"
        initialValues={{ title: image.title, description: image.description }}
        onFinish={handleFormSubmit}
        labelAlign="right"
        labelCol={{ span: 5 }}
        autoComplete="off"
        form={form}
      >
        <Typography.Title>Edit Image</Typography.Title>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Image title is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea maxLength={50} />
        </Form.Item>
        <FileUpload
          label="Image"
          className={changeImage ? "" : "edit-image-modal__hidden-image"}
          name="image"
          accept=".png,.jpg,.jpeg"
          onError={onFileError}
          onBeforeUpload={onBeforeUploadFile}
        />
        {!changeImage && (
          <div className="edit-image-modal__change-image-button">
            <Button type="primary" onClick={() => setImageChange(true)}>
              Change Image
            </Button>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default EditImageModal;
