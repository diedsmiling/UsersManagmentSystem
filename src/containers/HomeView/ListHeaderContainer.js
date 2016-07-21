import { connect } from 'react-redux'
import ListHeader from 'components/HomeView/ListHeader'
import { filterData } from 'routes/Home/modules/home'
import { debounce } from 'lodash'

const setFilterPattern = debounce(function(collection, value, dispatch) {
  dispatch(filterData(collection, value))
}, 300)

const mapActionCreators = (dispatch) => {
  return {
    filter (e) {
      e.persist()
      setFilterPattern(this.props.collection, e.target.value, dispatch)
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  title: ownProps.collection === 'users' ? 'Forms' : 'User Groups',
  collection: ownProps.collection
})

export default connect(mapStateToProps, mapActionCreators)(ListHeader)
