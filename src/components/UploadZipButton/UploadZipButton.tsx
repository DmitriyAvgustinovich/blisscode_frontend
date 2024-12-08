import React from "react";

import { Typography, Upload, message } from "antd";
import { useContexts } from "hooks";

import { UploadProps } from "antd/es/upload/interface";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "./UploadZipButton.module.scss";

export const UploadZipButton = () => {
  const [isUploadFileLoading, setIsUploadFileLoading] = React.useState(false);

  const {
    solutionFileCodeContext: { solutionFileName, setSolutionFileName },
  } = useContexts();

  const beforeFileUpload = (file: File) => {
    const isZipFile =
      file.type === "application/zip" ||
      file.type === "application/x-zip-compressed";

    const isTenMBFileWeight = file.size / 1024 / 1024 < 10;

    if (!isZipFile) {
      message.error("Файл должен быть в формате ZIP");
      return false;
    }

    if (!isTenMBFileWeight) {
      message.error("Файл не должен превышать 10MB");
      return false;
    }

    return true;
  };

  const handleUploadFileChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setIsUploadFileLoading(true);
      return;
    }

    if (info.file.status === "done" && info.file.response) {
      setIsUploadFileLoading(false);
      const filename = info.file.response.filename;
      setSolutionFileName(filename);
    }

    if (info.file.status === "error") {
      setIsUploadFileLoading(false);
      message.error("Ошибка при загрузке файла");
    }
  };

  const uploadButton = (
    <div className={styles.uploadZipButtonWrapper}>
      {isUploadFileLoading ? <LoadingOutlined /> : <PlusOutlined />}

      <Typography.Text className={styles.uploadZipButtonText}>
        Загрузить файл решения
      </Typography.Text>
    </div>
  );

  const uploadProps = {
    name: "file",
    action: `${
      import.meta.env.VITE_BASE_URL
    }/solution-files/upload-solution-file`,
    onChange: handleUploadFileChange,
    beforeUpload: beforeFileUpload,
    showUploadList: false,
  };

  return (
    <Upload {...uploadProps}>
      {solutionFileName ? (
        <div className={styles.uploadZipButtonUploadedFileWrapper}>
          <Typography.Text className={styles.uploadZipButtonUploadedFileText}>
            Файл решения под именем <b>{solutionFileName}</b> загружен
          </Typography.Text>
        </div>
      ) : (
        uploadButton
      )}
    </Upload>
  );
};