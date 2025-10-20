import { FC, useState } from "react";
import { FileUploader } from "../../../../components/input/file-uploader";
import { Button, Divider, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTE_BACKEND_HOME, ROUTE_PLACES } from "../../../../common/constants/route.constants";


export const BulkUpload: FC = () => {
    const { t } = useTranslation();
    const [isLoaded, setIsLoaded] = useState<{ loaded: boolean, success: "success" | "error" | "", }>({ loaded: false, success: "" });
    const navigate = useNavigate()

    return <div className="place-form">
        <Divider orientation="left" children={<h4>{t('import_from_excel')}</h4>} />

        <div>
            Excel yulash uchun shablonni <a href={"/Arxeologiya.xlsx"} download={"Shablon.xlsx"}>yuklab olish</a>
        </div>

        {
            isLoaded.success == "" && <FileUploader
                name="files"
                label={t("import_excel_file")}
                path="import"
                accept=".xlsx"
                setIsLoaded={setIsLoaded}
                customStyle={{ height: "50px", width: "200px" }}
            />

        }

        {
            isLoaded.loaded ?
                isLoaded.success === "success" ? <Result
                    status="success"
                    title={t("file_uploaded")}
                    extra={[
                        <Button type="primary" key="console" onClick={() => navigate(`${ROUTE_BACKEND_HOME}/${ROUTE_PLACES}`)}>
                            {t("back_to_list")}
                        </Button>,
                        <Button key="buy" onClick={() => setIsLoaded({ loaded: false, success: "" })}>{t("upload_again")}</Button>,
                    ]}
                    subTitle={t("file_uploaded_subtext")} /> :
                    <Result
                        status="error"
                        title={t("file_not_uploaded")}
                        subTitle={t("file_not_uploaded_subtext") + " Xatolik sabbabi: " + isLoaded.success}
                        extra={[
                            <Button onClick={() => setIsLoaded({ loaded: false, success: "" })} type="primary" key="console">
                                {t("upload_again")}
                            </Button>,

                        ]}
                    >

                    </Result>
                : ""

        }


    </div >
}