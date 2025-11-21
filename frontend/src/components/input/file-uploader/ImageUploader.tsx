import React, { useState, ChangeEvent, Fragment, useRef } from "react";

import { UseFormSetValue } from "react-hook-form";
import { CheckCircleFilled, FileExclamationFilled, UploadOutlined } from '@ant-design/icons'


import './styles.scss'
import { uploadFile } from "../../../common/functions";
import { message, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { ENDPOINT_BASE_URL } from "../../../common/constants/endpoind.constants";

interface ImageUploaderProps {
    path: string;
    name: string;
    accept?: string;
    label?: string;
    setIsLoaded?: (value: any) => void;
    customStyle?: React.CSSProperties,
    value?: string | null;
    type?: "post" | "profile"
    setValue: UseFormSetValue<any>
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ setIsLoaded, type, value, accept = "image/*", customStyle = { height: "40px" }, label, path, setValue, name }) => {

    const [stateOfFile, setStateOfFile] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const [preview, setPreview] = useState<string | null>(null);
    const { t } = useTranslation()
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        try {
            setIsLoading(true)
            let result: any = await uploadFile(path, name, undefined, file)
            if (result.success) {
                setIsLoading(false)
                messageApi.success({ content: t("upload_success") })

                if (type === "post") {
                    console.log(name, result.data.id);

                    setValue(name, result.data.id)
                } else {
                    setValue(name, result.data.imagePath,)
                }
                setIsLoaded && setIsLoaded({ loaded: true, success: "success" })
                setStateOfFile(true)
            }
        } catch (err: any) {
            setStateOfFile(false)
            setIsLoading(false)
            setIsLoaded && setIsLoaded({ loaded: true, success: err?.response?.data?.message })
            const errorMessage = `${t("file_upload_error")}\n ${t("error_code")}: ${err?.response?.status} \n ${t("cause")} ${err?.response?.data?.message}`
            messageApi.error(errorMessage)
        }
    }

    return (
        <Fragment>
            <p className="image_label">{label}</p>

            <div style={customStyle} className="image-wrapper">

                <div className="image-container">
                    <div
                        className="image-uploader"
                        onClick={() => inputRef.current?.click()}
                    >
                        <div className="state-of-file">
                            {isLoading ? <Spin /> :
                                stateOfFile === null ? <UploadOutlined style={{ fontSize: "20px" }} /> : !stateOfFile ? <FileExclamationFilled style={{ color: "red", fontSize: "20px" }} /> : <CheckCircleFilled style={{ color: "green", fontSize: "20px" }} />
                            }
                        </div>
                        <div >
                            {
                                preview ? (
                                    <img src={preview} alt="preview" className="image" />
                                ) :
                                    value ?
                                        <img src={`${ENDPOINT_BASE_URL}${value}`} alt="preview" className="image" /> :
                                        <span>
                                            <br />
                                            <br />
                                            "No image selected"
                                        </span>

                            }
                        </div>
                    </div>
                </div>

                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                />
            </div>
            {contextHolder}
        </Fragment>
    );
}
