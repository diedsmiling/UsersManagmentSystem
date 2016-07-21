import { connect } from 'react-redux'
import { fetchUsers, fetchGroups } from '../modules/home'

import HomeView from 'components/HomeView'

const mapActionCreators = {
  fetchUsers,
  fetchGroups
}

const mapStateToProps = (state) => ({
  users: state.users,
  groups: state.groups
})

export default connect(mapStateToProps, mapActionCreators)(HomeView)
