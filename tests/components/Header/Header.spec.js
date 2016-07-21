import React from 'react'
import { Header } from 'components/Header/Header'
import classes from 'components/Header/Header.scss'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'
import { AppBar } from 'material-ui'

describe('(Component) Header', () => {
  let _wrapper

  beforeEach(() => {
    _wrapper = shallow(<Header/>)
  })

  describe('App bar...', () => {

    it('Should render an application bar', () => {
      expect(_wrapper.contains(
        <AppBar
          titleStyle={{overflow: 'visible', color: 'red'}}
          iconClassNameLeft="icon-people"
          title={
            <Link className={classes.link} to={'/'}>
              Users management system
            </Link>}
          style={{backgroundColor: '#3498db'}}
        />
      )).to.be.true
    })
  })
})
