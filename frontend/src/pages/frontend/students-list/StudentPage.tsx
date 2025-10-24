import { FC, useEffect } from "react";
import './styless.scss'
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchOneStundent } from "../../../features/students-list/thunks";
import { Col, Row } from "antd";
import boy from '../../../assets/images/boy.png';
import girl from '../../../assets/images/girl.png';
import { ENDPOINT_BASE_URL } from "../../../common/constants/endpoind.constants";
export const StudentPage: FC = () => {
    const dispatch = useAppDispatch();
    const { studentId } = useParams();
    const { result, isLoading } = useAppSelector(state => state.student);

    useEffect(() => {
        dispatch(fetchOneStundent(studentId || ""));
    }, []);



    return (
        <div className="student-info">

            <h3 className="title">Grades</h3>
            <Row gutter={50} className="links"> {
                isLoading ? <Col className="emprt_text">Loading...</Col> :
                    <>
                        <Col xs={24} xl={8} md={10} xxl={5} className="student_image">
                            <img src={
                                result?.imagePath ? result?.imagePath :
                                    result?.gender ? boy : girl
                            } alt="image of student" />
                        </Col>
                        <Col xs={24} md={12} >
                            <h4 className="user_name"> {result?.fullName}</h4>
                            <div className="email"><a href={`mailto:${result?.email}`}>{result?.email}</a> </div>
                            <div className="info">
                                <b>Age: </b>{(() => {
                                    const bd = result?.birthDate;
                                    if (!bd) return '—';
                                    const b = new Date(bd);
                                    if (isNaN(b.getTime())) return '—';
                                    const now = new Date();
                                    let age = now.getFullYear() - b.getFullYear();
                                    const m = now.getMonth() - b.getMonth();
                                    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
                                    return age;
                                })()} years old
                            </div>
                            <div className="info">
                                <b>Grade:</b> {result?.grade.name || '—'}
                            </div>
                            <div className="info">
                                <b>Class:</b> {result?.class.name || '—'}
                            </div>
                        </Col>
                        <Col xs={24} md={24} className="files_section">
                            <h4 className="files_title">Student achievements</h4>
                            {
                                result?.files.length == 0 ? <div className="emprt_text">No achievements</div> :
                                    <ul className="files_list">
                                        {
                                            result?.files.map((file) => (
                                                <li>
                                                    <a key={file.id} href={`${ENDPOINT_BASE_URL}${file.path}`} target="_blank" rel="noopener noreferrer" className="file_item" > {file.name}</a>
                                                </li>
                                            ))
                                        }
                                    </ul>
                            }
                        </Col>
                    </>
            }
            </Row>


        </div>
    )
}

