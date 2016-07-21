import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'groups',
  childRoutes: [
    {
      path: 'add',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const AddGroup = require('./containers/AddContainer.js').default
          const reducer = require('./modules/groups').default
          injectReducer(store, { key: 'group', reducer })
          cb(null, AddGroup)
        }, 'counter')
      }
    },
    {
      path: 'view/:id',
      getComponent (nextState, cb) {
        require.ensure([], (require) => {
          const ViewGroup = require('./containers/ViewContainer.js').default
          const reducer = require('./modules/groups').default
          injectReducer(store, { key: 'group', reducer })
          cb(null, ViewGroup)
        }, 'counter')
      }
    }
  ]
})

