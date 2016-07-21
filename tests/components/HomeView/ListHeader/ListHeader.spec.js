import React from 'react'
import { bindActionCreators } from 'redux'
import ListHeader from 'components/HomeView/ListHeader/ListHeader'
import { shallow } from 'enzyme'
import classes from 'components/HomeView/ListHeader/ListHeader.scss'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

describe('(Component) ListHeader', () => {
  let _props, _spies, _wrapper
  beforeEach(() => {
    _props = {
      collection: 'users',
      title: 'Mocked title',
      filter: function (collection, pattern) {}
    }
    _wrapper = shallow(<ListHeader {..._props} />)
  })

  it('should render as a <div>', () => {
    expect(_wrapper.is('div')).to.be.true
  })

  it('should render a <h2> with title', () => {
    expect(_wrapper.find('h2').text()).to.match(new RegExp(_props.title))
  })

  it('should render a search-container <div> as grid column of length 10', () => {
    expect(_wrapper.find('.' + classes['search-container']).hasClass('col-sm-10'))
  })

  it('should render a <TextField> component', () => {
    expect(_wrapper.find(TextField)).to.have.length(1)
  })

  it('should render a new-entity-container <div> as a grid column of length 2', () => {
    expect(_wrapper.find('.' + classes['new-entity-container']).hasClass('col-sm-2'))
  })

  it('should render a <FloatingActionButton> component width a <ContentAdd /> child', () => {
    expect(_wrapper.contains(
      <FloatingActionButton mini={true} secondary={true} >
        <ContentAdd />
      </FloatingActionButton>
    )).to.be.true
  })

})
