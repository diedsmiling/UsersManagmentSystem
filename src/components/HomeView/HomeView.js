import React, { PropTypes } from 'react'
import classes from './HomeView.scss'
import ListHeader from 'containers/HomeView/ListHeaderContainer'
import List from 'containers/HomeView/ListContainer'

class HomeView extends React.Component {
  componentDidMount () {
    this.props.fetchUsers()
    this.props.fetchGroups()
  }

  render () {
    const collections = ['users', 'groups']
    return (
      <div className="row">
        {
          collections.map(collection => (
            <div
              key={collection}
              className={classes.block +
                ' col-xs-12 col-sm-12 col-md-6 col-lg-6'}
            >
              <div className="col-sm-12">
                <ListHeader collection={collection} />
                <List collection={collection} />
              </div>
            </div>
          ))
        }
      </div>
    )
  }

  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    fetchGroups: PropTypes.func.isRequired
  }
}

export default HomeView
