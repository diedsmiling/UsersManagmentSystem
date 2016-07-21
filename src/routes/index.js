import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import UsersRoute from './Users'
import GroupsRoute from './Groups'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home(store),
  childRoutes: [
    UsersRoute(store),
    GroupsRoute(store)
  ]
})

export default createRoutes
