import { connect } from 'react-redux'
import List from 'components/HomeView/List/List'
import { deleteData } from 'routes/Home/modules/home'

const mapActionCreators = (dispatch) => ({
  deleteItem (collection, id) {
    dispatch(deleteData(collection, id))
  }
})
const mapStateToProps = (state, ownProps) => {
  let users = Object.assign({}, state.home.users)
  let groups = Object.assign({}, state.home.groups)

  users.entities.map(user => {
    user.displayName = user.firstName + ' ' + user.lastName
    user.avatar = user.displayName.charAt(0).toUpperCase()
    return user
  })
  if (users.filterPattern) {
    users.entities = users.entities.filter(user =>
      users.filterPattern && user.displayName.match(users.filterPattern)
    )
  }

  groups.entities.map(group => {
    group.displayName = group.title + ' (' + group.users.length + ')'
    group.avatar = group.displayName.charAt(0).toUpperCase()
    return group
  })
  if (groups.filterPattern) {
    groups.entities = groups.entities.filter(user =>
      groups.filterPattern && user.displayName.match(groups.filterPattern)
    )
  }

  return {
    collectionLiteral: ownProps.collection,
    collection: ownProps.collection === 'users'
      ? users
      : groups
  }
}

export default connect(mapStateToProps, mapActionCreators)(List)
