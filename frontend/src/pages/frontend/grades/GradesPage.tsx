import { FC } from "react";
import { GRADES_ARRAY } from "../../../common/constants/base.constants";
import './styless.scss'
import { Link } from "react-router-dom";
export const GreadesPage: FC = () => {


    return (
        <div className="grades">

            <h3 className="title">Grades</h3>
            <div className="links">
                {
                    GRADES_ARRAY.map((grade) => (
                        <Link className="card" to={grade} key={grade}> Grade {grade}</Link>
                    ))
                }
            </div>


        </div>
    )
}

