import { UploadProps } from "antd";

export const dummyRequest: Required<UploadProps>["customRequest"] = ({
  onSuccess,
}) => {
  setTimeout(() => {
    onSuccess && onSuccess("ok");
  }, 0);
};
