import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'users',
  childRoutes: [
    {
      path: 'add',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const AddUser = require('./containers/AddContainer.js').default
          const reducer = require('./modules/users').default
          injectReducer(store, { key: 'user', reducer })
          cb(null, AddUser)
        }, 'user')
      }
    },
    {
      path: 'view/:id',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const ViewUser = require('./containers/ViewContainer.js').default
          const reducer = require('./modules/users').default
          injectReducer(store, { key: 'user', reducer })
          cb(null, ViewUser)
        }, 'user')
      }
    }
  ]
})

