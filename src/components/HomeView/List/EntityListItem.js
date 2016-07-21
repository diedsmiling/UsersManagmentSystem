import React, { PropTypes } from 'react'
import classes from './List.scss'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import { Link } from 'react-router'

class EntityListItem extends React.Component {
  render () {
    const { entity, literal, deleteFn, id } = this.props
    const listItemStyle = {
      background: '#fff',
      border: 'none'
    }
    const avatar =
      <Avatar backgroundColor="#3498db" size={40} >
        {entity.avatar}
      </Avatar>

    const rightIconButton =
      <a
        onClick={function () { deleteFn(literal, id) }}
        style={{top: 20, right: 40}}
        className={classes['delete-user']}
      >
        <i className="icon-trash" />
      </a>

    return (
      <div className="list-item">
        <ListItem
          style={listItemStyle}
          children={
            <Link to={'/' + literal + '/view/' + entity.id}>
              {entity.displayName}
            </Link>
          }
          leftAvatar={avatar}
          rightIconButton={rightIconButton}
        />
      </div>
    )
  }
  static propTypes = {
    id: PropTypes.number,
    literal: PropTypes.string,
    deleteFn: PropTypes.func,
    entity: PropTypes.shape({
      displayName: PropTypes.string,
      avatar: PropTypes.avatar
    })
  }
}

export default EntityListItem
