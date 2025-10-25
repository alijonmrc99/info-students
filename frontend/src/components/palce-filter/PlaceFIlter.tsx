import { FC, useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Button, Col, Row } from "antd";
import './styles.scss';
import { SearchOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { IPlaceFilter, IPlaceFilterData, PlaceFilterContext } from "../../common/contexts";
import { TextFieldController } from "../input/text-filed-controller";
import { SelectController } from "../input/select-controller";

export const PlaceFilter: FC<{ where?: string }> = ({ where = "map" }) => {
    const { setFilter } = useContext(PlaceFilterContext) as IPlaceFilterData;
    const { t } = useTranslation();








    const checkEmptyValues = (object: any) => {
        for (const key in object) {
            if (!object[key])
                delete object[key]
        }
        return object
    }

    const onSubmit = (value: IPlaceFilter) => {
        if (typeof value.periodIds === "object") {
            value.periodIds = value.periodIds.join(",");
        }
        if (typeof value.stateOfPreservationId === "object") {

            value.stateOfPreservationIds = value.stateOfPreservationId?.join(",");
            delete value.stateOfPreservationId
        }

        setFilter({
            ...checkEmptyValues(value)
        })
    }


    return (
        <div className="filter-container">


        </div>
    )
}