import { FC, useEffect, useState } from "react";
import '../grades/styless.scss'
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchAllStudents } from "../../../features/students-list/thunks";

export const StudentsList: FC = () => {
    const dispatch = useAppDispatch();

    const { result, isLoading } = useAppSelector(state => state.places);
    const { gradeId, classId } = useParams();
    if (gradeId) {
        const grade = Number(gradeId) - 4
        useEffect(() => {
            console.log("Class ID:", classId);
            console.log("Grade ID:", gradeId);

            dispatch(fetchAllStudents({ classId, gradeId: grade }));
        }, [classId, gradeId]);
        return (
            <div className="grades">

                <h3 className="title">Students List</h3>
                <div className="links">
                    {
                        isLoading ? <div className="emprt_text">Loading...</div> :
                            result?.data.length == 0 ?
                                <div className="emprt_text">No Students Found</div>
                                :
                                result?.data.map((item, index) => (
                                    <Link to={`${item.id}`} className="card" key={item.id}>{index + 1}. {item.fullName}</Link>
                                ))
                    }
                </div>


            </div>
        )
    }

}