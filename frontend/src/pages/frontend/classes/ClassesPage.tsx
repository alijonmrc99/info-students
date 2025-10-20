import { FC } from "react";
import { CLASS_ARRAY } from "../../../common/constants/base.constants";
import './styless.scss'
import { Link } from "react-router-dom";
export const ClassesPage: FC = () => {


    return (
        <div className="classes">

            <h3 className="title">Classes</h3>
            <div className="links">
                {
                    CLASS_ARRAY.map((item, index) => (
                        <Link className="card" to={`${index + 1}`} key={item}> {item}</Link>
                    ))
                }
            </div>


        </div>
    )
}

