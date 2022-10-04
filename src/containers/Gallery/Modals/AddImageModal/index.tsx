import { FC, useCallback, useState } from "react";
import { Form, Input, Modal, Typography } from "antd";
import { useDispatch } from "react-redux";
import { FormProps } from "rc-field-form/lib/Form";

import FileUpload from "../../../../components/FileUpload";
import { AppDispatch } from "../../../../redux/state";
import { addImage } from "../../../../redux/slices/gallery.slice";
import { toBase64 } from "../../../../utils/toBase64";
import { ImageModalFormProps } from "../types";

type AddImageModalProps = {
  open?: boolean;
  onClose: () => void;
};

const AddImageModal: FC<AddImageModalProps> = ({ open = true, onClose }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm<ImageModalFormProps>();

  const onBeforeUploadFile = useCallback(() => {
    form.setFields([{ name: "image", errors: [] }]);
  }, [form]);

  const onFileError = useCallback(
    (error: string) =>
      form.setFields([{ name: "image", errors: [error], validating: true }]),
    [form]
  );

  const handleFormSubmit: FormProps<ImageModalFormProps>["onFinish"] = async (
    data
  ) => {
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
          rules={[
            { required: true, message: "Image is requried" },
            {
              validator: async (rule, value) => {
                if (!(value instanceof File)) return "Error uploading the file";
                if (value.size > 250000) return "Image size exceeded 250 mb";
              },
            },
          ]}
          accept=".png,.jpg,.jpeg"
          onError={onFileError}
          onBeforeUpload={onBeforeUploadFile}
        />
      </Form>
    </Modal>
  );
};

export default AddImageModal;
