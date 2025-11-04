import { IndexRouteObject, NonIndexRouteObject, RouteObject } from "react-router-dom";
import { RoleTypeEnums } from "../common/constants/base.constants";
import { ROUTE_BACKEND_HOME, ROUTE_GRADES, ROUTE_HOME, ROUTE_LOGIN, ROUTE_POSTS, ROUTE_STUDENTS, ROUTE_USERS } from "../common/constants/route.constants";
import { Home } from "../pages/frontend/home/Home";
import { LoginForm } from "../features/auth/components/login-form";
import { BaseLayout } from "../layouts";
import { Backend } from "../pages/backend/dashboard";
import { Students } from "../pages/backend/students/Students";
import { Users } from "../pages/backend/users";
import { UserForm } from "../features/user/components/user-form";
import { GreadesPage } from "../pages/frontend/grades";
import { ClassesPage } from "../pages/frontend/classes";
import { StudentsList, StudentPage } from "../pages/frontend/students-list";
import { StudentsForm } from "../features/students-list/components/students";
import { Posts } from "../pages/backend/posts";
import { PostForm } from "../features/periods/components/posts-form";
import { PostPage } from "../pages/frontend/posts";


export type RouteObjectType = IndexRouteObject |
    (Omit<NonIndexRouteObject, "children"> & { children: (RouteObject & { roles?: RoleTypeEnums[] })[] }) & { roles?: RoleTypeEnums[] }

export const routes = (): RouteObjectType[] => {
    return [
        {
            path: ROUTE_HOME,
            caseSensitive: true,
            element: <BaseLayout />,
            children: [
                {
                    path: ROUTE_HOME,
                    element: <Home />,
                },
                {
                    path: ROUTE_GRADES,
                    element: <GreadesPage />,

                },
                {
                    path: `${ROUTE_GRADES}/:id`,
                    element: <ClassesPage />,
                },
                {
                    path: `${ROUTE_GRADES}/:gradeId/:classId`,
                    element: <StudentsList />,
                },
                {
                    path: `${ROUTE_GRADES}/:gradeId/:classId/:studentId`,
                    element: <StudentPage />,
                },
                {
                    path: ROUTE_POSTS,
                    element: <PostPage />,

                },
                {
                    path: `${ROUTE_GRADES}/:id`,
                    element: <ClassesPage />,
                },



            ]
        },
        {
            path: ROUTE_LOGIN,
            caseSensitive: true,
            element: <LoginForm />,
            children: []
        },
        {
            path: ROUTE_BACKEND_HOME,
            caseSensitive: true,
            element: <Backend />,
            children: [
                {
                    path: ROUTE_STUDENTS,
                    element: <Students />,
                },
                {
                    path: `${ROUTE_STUDENTS}/create`,
                    element: <StudentsForm />,
                },
                {
                    path: `${ROUTE_STUDENTS}/:id`,
                    element: <StudentsForm />,
                },
                {
                    path: `${ROUTE_USERS}`,
                    element: <Users />,
                },
                {
                    path: `${ROUTE_USERS}/create`,
                    element: <UserForm />,
                },
                {
                    path: `${ROUTE_USERS}/:id`,
                    element: <UserForm />,
                },
                {
                    path: `${ROUTE_POSTS}`,
                    element: <Posts />,
                },
                {
                    path: `${ROUTE_POSTS}/create`,
                    element: <PostForm />,
                },
                {
                    path: `${ROUTE_POSTS}/:id`,
                    element: <PostForm />,
                },
            ]
        }

    ]
} 