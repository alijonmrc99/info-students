import { Col, Divider, Drawer, Row } from "antd"
import { FC, useContext, useEffect } from "react"
import { IPlaceModalData, PlaceModalContext } from "../../common/contexts"
import { useAppDispatch, useAppSelector } from "../../store"
import { fetchOnePlace } from "../../features/places/thunks"
import { useTranslation } from "react-i18next"
import './styles.scss'
import { ENDPOINT_BASE_URL } from "../../common/constants/endpoind.constants"
export const PlaceModal: FC = () => {
    const { setPlaceModal, placeModal } = useContext(PlaceModalContext) as IPlaceModalData
    const { isLoading, result: onePlace } = useAppSelector(state => state.place);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const onClose = () => {
        setPlaceModal({ open: false, id: "" })
    };



    useEffect(() => {
        dispatch(fetchOnePlace(placeModal.id));
    }, [placeModal])
    const lang: "Uz" | "En" = localStorage.getItem('i18nextLng') as "Uz" | "En";
    return <Drawer className="one-place" size="large" loading={isLoading} onClose={onClose} open={placeModal.open} >
        <Divider children={<h3 className="place-title">{t('general_informations')}</h3>} orientation="left" />
        <Row>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('place_name')}</p>: &nbsp;
                <p className="content">{onePlace?.name}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('second_name')}</p>: &nbsp;
                <p className="content">{onePlace?.secondName ? onePlace?.secondName : ""}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('province')}</p>: &nbsp;
                <p className="content">{onePlace?.province?.name}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('district')}</p>: &nbsp;
                <p className="content">{onePlace?.district?.name}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('area')}</p>: &nbsp;
                <p className="content">{onePlace?.area} m2</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('height')}</p>: &nbsp;
                <p className="content">{onePlace?.height} m</p>
            </Col>

        </Row>
        <Divider orientation="left" children={<h3 className="place-title">{t('scincial_information')}</h3>} />

        <Row>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('periods')}</p>: &nbsp;
                <p className="content">{onePlace?.periods?.map(period => (
                    <span className="period-color">{period[`name${lang}`]}</span>
                ))}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('typeOfPlace')}</p>: &nbsp;
                <p className="content">{onePlace?.typeOfPlace && onePlace?.typeOfPlace[`name${lang}`]}</p>
            </Col>

            <Col className="item" xs={24} md={12}>
                <p className="label">{t('state_of_preservation')}</p>: &nbsp;
                <p className="content">{onePlace?.stateOfPreservation && onePlace?.stateOfPreservation[`name${lang}`]}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('century')}</p>: &nbsp;
                <p className="content">{onePlace?.century}</p>
            </Col>
            <Col className="item" xs={24}>
                <p className="label">{t('description')}</p>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="content">{onePlace?.description}</p>
            </Col>
        </Row>
        <Divider orientation="left" children={<h3 className="place-title">{t('other_information')}</h3>} />

        <Row>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('isPlanographic')}</p>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="content">{onePlace?.learningOfHistory?.isPlanographic ? t("yes") : t("no")}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('isSurronded')}</p>: &nbsp;
                <p className="content">{onePlace?.securityInformation?.isSurronded ? t("yes") : t("no")}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('hasInformationBoard')}</p>: &nbsp;
                <p className="content">{onePlace?.securityInformation?.hasInformationBoard ? t("yes") : t("no")}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('hasCadastralDoc')}</p>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="content">{onePlace?.securityInformation?.hasCadastralDoc ? t("yes") : t("no")}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('hasPrimaryStudy')}</p>: &nbsp;
                <p className="content">{onePlace?.learningOfHistory?.hasPrimaryStudy ? t("yes") : t("no")}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('expeditionType')}</p>: &nbsp;
                <p className="content">{onePlace?.expeditionType?.name}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('isShurf')}</p>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="content">{onePlace?.learningOfHistory?.isShurf ? t("yes") : t("no")}</p>
            </Col>
            <Col className="item" xs={24} md={12}>
                <p className="label">{t('informer')}</p>: &nbsp;
                <p className="content">{onePlace?.informer}</p>
            </Col>
            <Col className="item" xs={24}>
                <p className="label">{t('source')}</p>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <p className="content">{onePlace?.source}</p>
            </Col>

        </Row>
        <Divider children={<h3 className="place-title">{t('images')}</h3>} orientation="left" />
        <Row gutter={20} >
            {
                onePlace?.images?.length ? onePlace?.images?.map((image, index) => (

                    <Col className="item" xs={12} md={6} key={index}>
                        <img width={"100%"} src={`${ENDPOINT_BASE_URL}${image?.path}`} alt="" />
                    </Col>
                )) :
                    <Col className="item" xs={12} md={6}>
                        <p>{t('no_images')}</p>
                    </Col>


                // onePlace?.images?.map((image, index) => (
                //     <Col className="item" xs={12} md={6} key={index}>
                //         <img width={"100%"} src={`${ENDPOINT_BASE_URL}${image?.path}`} alt="" />
                //     </Col>
                // ))
            }
        </Row>
    </Drawer>
}