import { FC, useContext, useEffect } from "react";
import './styless.scss'
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchAllPosts } from "../../../features/periods/thunks";
import { Col, Flex, Row } from "antd";
import { ENDPOINT_BASE_URL } from "../../../common/constants/endpoind.constants";
import { MainPagination } from "../../../common/pagination";
import { IPaginationData, PaginationDataContext } from "../../../common/contexts";

export const PostPage: FC = () => {
    const dispatch = useAppDispatch();
    const { pagination, setPagination } = useContext(PaginationDataContext) as IPaginationData
    const { result, isLoading } = useAppSelector(state => state.posts);

    useEffect(() => {
        dispatch(fetchAllPosts({ ...pagination }));
    }, [pagination]);

    const onChange = (data: any) => setPagination(data)

    return (
        <div className="posts">

            <h3 className="title">Yangiliklar</h3>
            <Flex justify='end'>
                <MainPagination
                    onChange={onChange}
                    total={result?.meta.total || 0}
                    perPage={pagination.perPage}
                    showCount={false}
                    defaultCurrent={pagination.page}
                />
            </Flex> <br />
            <Row gutter={30} className="links">
                {
                    isLoading ? <div className="emprt_text">Loading...</div> :
                        result?.data?.length == 0 ?
                            <div className="emprt_text">No Post Found</div>
                            :
                            result?.data?.map((item) => (
                                <Col xs={24} md={12} xl={8} xxl={6} className="post_card" key={item.id}>
                                    <div className="post_border">
                                        <img className="post_image" src={`${ENDPOINT_BASE_URL}${item?.image?.path}`} alt="post image" />
                                        <div className="post_body">
                                            <h4>{item.title}</h4>
                                            <p className={`badge badge-${Math.round(item.gradeId / 2)}`} >grade: {`${item.gradeId + 4} `}</p>
                                            <p>{item.content}</p>
                                        </div>
                                    </div>
                                </Col>
                            ))
                }
            </Row>


        </div>
    )
}

