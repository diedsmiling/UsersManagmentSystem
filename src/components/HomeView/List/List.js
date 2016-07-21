import React, { PropTypes } from 'react'
import EntityListItem from './EntityListItem'
import { List } from 'material-ui/List'
import classes from './List.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class EntitiesList extends React.Component {
  render () {
    const { deleteItem, collectionLiteral } = this.props
    return (
      <div className="row">
        <List style={{ width: '100%' }}>
          <ReactCSSTransitionGroup
            transitionEnterTimeout={900}
            transitionLeaveTimeout={600}
            transitionName={{
              enter: 'list-item__enter',
              enterActive: 'list-item__enter-active',
              leave: 'list-item__leave',
              leaveActive: 'list-item__leave-active'
            }}>
            {
              this.props.collection.entities.map(entity => (
                <EntityListItem
                  key={entity.id}
                  id={entity.id}
                  deleteFn={deleteItem}
                  literal={collectionLiteral}
                  entity={entity}
                />
              ))
            }
          </ReactCSSTransitionGroup>
        </List>
      </div>
    )
  }

  static propTypes = {
    deleteItem: PropTypes.func,
    collectionLiteral: PropTypes.string,
    collection: PropTypes.shape({
      error: PropTypes.string,
      entities: PropTypes.array,
      loading: PropTypes.bool
    }).isRequired
  }
}

export default EntitiesList
