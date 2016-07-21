import React from 'react'
import { bindActionCreators } from 'redux'
import HomeView from 'components/HomeView/HomeView'
import { shallow } from 'enzyme'
import classes from 'components/HomeView/HomeView.scss'
import ListHeader from 'containers/HomeView/ListHeaderContainer'

describe('(Component) HomeView', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      ...bindActionCreators({
        fetchGroups: (_spies.fetchGroups = sinon.spy()),
        fetchUsers: (_spies.fetchUsers = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }

    _wrapper = shallow(<HomeView {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.equal(true)
  })

  it('Should render as a <div> with "row" class', () => {
    expect(_wrapper.hasClass('row')).to.equal(true)
  })

  it('Should render 2 grid columns', () => {
    let _blocks = _wrapper.find('.' + classes.block)
    expect(_blocks).to.have.length(2)
    expect(_blocks.first().hasClass('col-xs-12 col-sm-12 col-md-6 col-lg-6')).to.be.true
    expect(_blocks.last().hasClass('col-xs-12 col-sm-12 col-md-6 col-lg-6')).to.be.true
  })

  it('Should render <ListHeader> components', () => {
    expect(_wrapper.contains(<ListHeader collection="users" />)).to.be.true
    expect(_wrapper.contains(<ListHeader collection="groups" />)).to.be.true
  })

})
