import { useAppSelector } from './store'
import { useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { RouteObjectType, routes } from './routes'
import { RoleTypeEnums } from './common/constants/base.constants'
import { HttpApi } from './common/http'
import { ScreenError404 } from './common/screens'
export const httpApi = new HttpApi();
const filterByPermission = (roles: RoleTypeEnums[], items: RouteObjectType[]) => {
  return items.map(item => {
    if (item.children?.length) {
      return ({
        ...item,
        children: item.children.filter(child => roles.some(role => child?.roles?.includes(role)) || !child.roles?.length),
      })
    } else {
      return item
    }
  })
}

function App() {
  // const { result: user } = useAppSelector(state => state.me);
  // const { pathname } = useLocation();
  // const [filteredRoutes, setFilteredRoutes] = useState<RouteObjectType[]>(routes())

  // useEffect(() => {
  //   if (user) {
  //     setFilteredRoutes(filterByPermission(user?.roles.map((role: { name: any }) => role.name) || [], routes()))
  //   }
  // }, [user])

  return useRoutes([
    ...routes(),
    {
      path: "*",
      element: <ScreenError404 />
    }
  ])
}

export default App
