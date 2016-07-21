import React, { PropTypes } from 'react'
import classes from './ListHeader.scss'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { Link } from 'react-router'

class ListHeader extends React.Component {
  render () {
    const { filter, collection } = this.props
    this.filter = filter.bind(this)
    return (
      <div>
        <h2 className={classes.header}> {this.props.title} </h2>
        <div className="row">
          <div className={classes['search-container'] + ' col-sm-10'}>
            <TextField
              onChange={this.filter}
              hintText="Enter a title"
              style={{width: '100%'}}
              floatingLabelText="Search"
            />
          </div>
          <div className={classes['new-entity-container'] + ' col-sm-2'}>
            <Link to={'/' + collection + '/add'}>
              <FloatingActionButton mini secondary >
                <ContentAdd />
              </FloatingActionButton>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  static propTypes = {
    collection: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    filter: PropTypes.func.isRequired
  }
}

export default ListHeader
