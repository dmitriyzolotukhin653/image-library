import { FC } from "react";
import { Button, Upload, UploadProps, Form, FormItemProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";

import { dummyRequest } from "../../utils/dummyRequest";

type FileUploadProps = {
  accept?: UploadProps["accept"];
  onBeforeUpload?: UploadProps["beforeUpload"];
  onError?: (error: string) => void;
} & FormItemProps;

const FileUploadFormItem: FC<FileUploadProps> = ({
  accept,
  onBeforeUpload = () => {},
  onError = () => {},
  ...props
}) => {
  const handleChange = ({ file }: UploadChangeParam) => {
    switch (file.status) {
      case "removed":
        return null;
      case "error":
        onError("Error uploading file");
        return null;
      case "success":
      case "uploading":
        return null;
      case "done":
        if (!file.originFileObj) {
          onError("Error uploading file");
          return null;
        }
        return file.originFileObj;
      default:
        return null;
    }
  };

  return (
    <Form.Item {...props} getValueFromEvent={handleChange}>
      <Upload
        customRequest={dummyRequest}
        accept={accept}
        maxCount={1}
        multiple={false}
        beforeUpload={onBeforeUpload}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default FileUploadFormItem;
