import React from 'react'
import { AppBar } from 'material-ui'
import { Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <AppBar
    titleStyle={{overflow: 'visible', color: 'red'}}
    iconClassNameLeft="icon-people"
    title={
      <Link className={classes.link} to={'/'}>
        Users management system
      </Link>}
    style={{backgroundColor: '#3498db'}}
  />
)

export default Header
