import React, { useState, ChangeEvent, Fragment } from "react";

import { UseFormSetValue } from "react-hook-form";
import { CheckCircleOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons'


import './styles.scss'
import { deleteFile, IFile, uploadFile } from "../../../common/functions";
import { Col, message, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { ID } from "../../../common/models";
import { ENDPOINT_BASE_URL } from "../../../common/constants/endpoind.constants";


interface FileUploaderProps {
    path: string;
    name: string;
    multiple?: boolean;
    accept?: string;
    label?: string;
    setIsLoaded?: (value: any) => void;
    customStyle?: React.CSSProperties,
    setValue: UseFormSetValue<any>
}


export const FileUploader: React.FC<FileUploaderProps> = ({ setIsLoaded, accept = "image/*", customStyle = { height: "40px" }, label, path, multiple = false, setValue, name }) => {
    const [files, setFiles] = useState<({ id: ID, path: string, name: string })[]>([]);
    const [stateOfFile, setStateOfFile] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()
    const { t } = useTranslation()
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const curentFiles = event.target.files ? Array.from(event.target.files) : [];

        try {
            setIsLoading(true)
            let result: IFile | undefined = await uploadFile(path, name, curentFiles)
            if (result?.success) {
                setIsLoading(false)
                messageApi.success({ content: t("upload_success") })
                setFiles(prevFiles => [...prevFiles, ...result!.files])
                setValue(name, result!.files.map(item => item.id))
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

    };




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
                    <Col span={24}>
                        <p>Yangi yuklanganlar</p>
                        {files.length > 0
                            && files.map(file => (
                                <div className="student-file" key={file.id}>
                                    <a key={file.id} href={`${ENDPOINT_BASE_URL}${file.path}`} target="_blank" rel="noopener noreferrer">
                                        {file.name}
                                    </a>
                                    <button type="button" onClick={() => {
                                        deleteFile(file.id).then(() => {
                                            setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
                                            setValue(name, files?.filter(f => f.id !== file.id).map(item => item.id))
                                            messageApi.success({ content: t("file_delete_success") })
                                        }
                                        ).catch((_err) => {
                                            messageApi.error({ content: t("file_delete_error") })
                                        })
                                    }} className="delete-file-button">
                                        x
                                    </button>
                                </div>
                            ))}
                    </Col>
                </Row>
            }

        </Fragment>
    );
};
