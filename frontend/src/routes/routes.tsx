import { IndexRouteObject, NonIndexRouteObject, RouteObject } from "react-router-dom";
import { RoleTypeEnums } from "../common/constants/base.constants";
import { ROUTE_ABOUT, ROUTE_BACKEND_HOME, ROUTE_CLASSES, ROUTE_GRADES, ROUTE_HOME, ROUTE_LOGIN, ROUTE_PERIODS, ROUTE_PLACES, ROUTE_PRESERVATIONS, ROUTE_TYPE_PLACE, ROUTE_USERS } from "../common/constants/route.constants";
import { Home } from "../pages/frontend/home/Home";
import { LoginForm } from "../features/auth/components/login-form";
import { BaseLayout } from "../layouts";
import { Backend } from "../pages/backend/dashboard";
import { Places } from "../pages/backend/places/Places";
import { PlaceForm } from "../features/places/components/place-form";
import { BulkUpload } from "../features/places/components/place-form/BulkUpload";
import { Periods } from "../pages/backend/periods";
import { PeriodsForm } from "../features/periods/components/periods-form";
import { Preservations } from "../pages/backend/state-of- preservation/periods";
import { PreservationForm } from "../features/state-of-preservation/components/preservation-form";
import { Users } from "../pages/backend/users";
import { UserForm } from "../features/user/components/user-form";
import { PlaceTypes } from "../pages/backend/place-types/periods";
import { PlaceTypesForm } from "../features/type-of-place/components/place-type-form";
import { GreadesPage } from "../pages/frontend/grades";
import { ClassesPage } from "../pages/frontend/classes";
import { StudentsList, StudentPage } from "../pages/frontend/students-list";


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
                    path: ROUTE_PLACES,
                    element: <Places />,
                },
                {
                    path: `${ROUTE_PLACES}/bulk-upload`,
                    element: <BulkUpload />,
                },
                {
                    path: `${ROUTE_PLACES}/create`,
                    element: <PlaceForm />,
                },
                {
                    path: `${ROUTE_PLACES}/:id`,
                    element: <PlaceForm />,
                },
                {
                    path: `${ROUTE_PERIODS}`,
                    element: <Periods />,
                },
                {
                    path: `${ROUTE_PERIODS}/:id`,
                    element: <PeriodsForm />,
                },
                {
                    path: `${ROUTE_PRESERVATIONS}`,
                    element: <Preservations />,
                },
                {
                    path: `${ROUTE_PRESERVATIONS}/:id`,
                    element: <PreservationForm />,
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
                    path: `${ROUTE_TYPE_PLACE}`,
                    element: <PlaceTypes />,
                },
                {
                    path: `${ROUTE_TYPE_PLACE}/create`,
                    element: <PlaceTypesForm />,
                },
                {
                    path: `${ROUTE_TYPE_PLACE}/:id`,
                    element: <PlaceTypesForm />,
                },
            ]
        }

    ]
} 