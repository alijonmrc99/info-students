import React, { useState, ChangeEvent, Fragment } from "react";

import { UseFormSetValue } from "react-hook-form";
import { CheckCircleOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'


import './styles.scss'
import { uploadFile } from "../../../common/functions";
import { Col, message, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { ENDPOINT_BASE_URL } from "../../../common/constants/endpoind.constants";
import { ID } from "../../../common/models";

interface FileUploaderProps {
    path: string;
    aspect?: number;
    name: string;
    multiple?: boolean;
    accept?: string;
    label?: string;
    setIsLoaded?: (value: any) => void;
    customStyle?: React.CSSProperties,
    setValue?: UseFormSetValue<any>
}

export const FileUploader: React.FC<FileUploaderProps> = ({ setIsLoaded, accept = "image/*", customStyle = { height: "40px" }, label, path, multiple = false, setValue, name }) => {
    const [images, setImages] = useState<(string | { id: ID, path: string })[]>([]);
    const [stateOfFile, setStateOfFile] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const { t } = useTranslation()
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];

        try {
            setIsLoading(true)
            let result: any = await uploadFile(files, path, name)
            if (result.success) {
                setIsLoading(false)
                messageApi.success({ content: t("upload_success") })
                setValue && setValue(name, [...result.result.paths],)
                setIsLoaded && setIsLoaded({ loaded: true, success: "success" })
                setStateOfFile(true)
            }
        } catch (err: any) {
            setStateOfFile(false)
            setIsLoading(false)
            setIsLoaded && setIsLoaded({ loaded: true, success: err?.response?.data?.message })
            const errorMessage = `${t("file_upload_error")}\n ${t("error_code")}: ${err?.response?.status} \n ${t("cause")} ${err?.response?.data?.message}`
            messageApi.error({ content: errorMessage })
        }

        files && Array.from(files).forEach(file => {
            if (file.type.startsWith("image/")) {

                const imagePreviews = files.map((file) => {
                    return new Promise((resolve) => {
                        if (file.type.startsWith("image/")) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target) {
                                    resolve(e.target.result);
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                });

                Promise.all(imagePreviews).then((results) => setImages([...images, ...results as string[]]));
            }
        })
    };

    // useEffect(() => {
    //     setImages([...oldImages])
    // }, [oldImages])


    return (
        <Fragment>
            <p>{label}</p>

            <div style={customStyle} className="image-wrapper">
                {isLoading ? <Spin /> :
                    stateOfFile === null ? <UploadOutlined style={{ fontSize: "20px" }} /> : !stateOfFile ? <ExclamationCircleOutlined style={{ color: "red", fontSize: "20px" }} /> : <CheckCircleOutlined style={{ color: "green", fontSize: "20px" }} />
                }

                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                />
            </div>
            {contextHolder}
            {
                <Row gutter={15} className="image-container">
                    {
                        images?.map((src, index) => (
                            <Col key={index} xs={4}>
                                <div onClick={
                                    () => console.log(src)
                                }
                                    className="delete-image">x</div>
                                <div>

                                    <img key={index}
                                        src={(typeof src === "object") ? `${ENDPOINT_BASE_URL}${src.path}` : src}
                                        alt={`preview-${index}`} />

                                </div>
                            </Col>
                        ))
                    }
                </Row>
            }

        </Fragment>
    );
};
