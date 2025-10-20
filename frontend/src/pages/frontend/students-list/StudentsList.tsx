import { FC, useEffect, useState } from "react";
import { GRADES_ARRAY } from "../../../common/constants/base.constants";
import '../grades/styless.scss'
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
export const StudentsList: FC = () => {
    const dispatch = useAppDispatch();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isActing, setIsActing] = useState(false);
    const { result, isLoading } = useAppSelector(state => state.places);
    const { classId, gradeId } = useParams();
    useEffect(() => {
        console.log("Class ID:", classId);
        console.log("Grade ID:", gradeId);
    }, [classId, gradeId]);
    return (
        <div className="grades">

            <h3 className="title">Students List</h3>
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

