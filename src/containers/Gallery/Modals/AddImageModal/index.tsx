import { FC, useCallback, useState } from "react";
import { Form, Input, Modal, Typography } from "antd";
import { useDispatch } from "react-redux";
import { FormProps } from "rc-field-form/lib/Form";

import FileUpload from "../../../../components/FileUpload";
import { AppDispatch } from "../../../../redux/state";
import { addImage } from "../../../../redux/slices/gallery.slice";
import { toBase64 } from "../../../../utils/toBase64";

type AddImageModalProps = {
  open?: boolean;
  onClose: () => void;
};

export type AddImageModalFormProps = {
  title: string;
  image: File | null;
  description?: string;
};

const AddImageModal: FC<AddImageModalProps> = ({ open = true, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

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
      if (!data.image) return;
      setConfirmLoading(true);
      const base64Image = await toBase64(data.image);
      dispatch(
        addImage({
          base64Image,
          title: data.title,
          ...(data.description ? { description: data.description } : {}),
        })
      );
      setConfirmLoading(false);
      onClose();
    };

  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}
      confirmLoading={confirmLoading}
      onOk={form.submit}
    >
      <Form
        layout="horizontal"
        initialValues={{ remember: true }}
        onFinish={handleFormSubmit}
        onFinishFailed={(error) => console.log("error: ", error)}
        labelAlign="right"
        labelCol={{ span: 5 }}
        autoComplete="off"
        form={form}
      >
        <Typography.Title>Add Image</Typography.Title>
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
          name="image"
          rules={[{ required: true, message: "Image is requried" }]}
          accept=".png,.jpg,.jpeg"
          onError={onFileError}
          onBeforeUpload={onBeforeUploadFile}
        />
      </Form>
    </Modal>
  );
};

export default AddImageModal;
