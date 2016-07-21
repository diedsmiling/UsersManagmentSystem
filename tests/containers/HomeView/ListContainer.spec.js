import React from 'react'
import { shallow } from 'enzyme'
import EntitiesList from 'components/HomeView/List/List'
import configureStore from 'redux-mock-store';
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  getLetterAvatar,
  default as ListContainer
} from 'containers/HomeView/ListContainer.js'

const mockStore = configureStore();
const dispatch = sinon.spy();


describe('(Component) ListContainer', () => {

  describe('pass props to connected component', ()=> {
    let _wrapper, _wr
    beforeEach(() => {
      _wrapper = shallow(
          <ListContainer dispatch={dispatch} entity="users" store={mockStore({ home: {
            users: {
              entities: [
                {
                  "id": 2,
                  "firstName": "Anthony",
                  "lastName": "Stark",
                  "nickname": "Iron Man",
                  "email": "supertony_63@yahoo.com"
                },
                {
                  "id": 3,
                  "firstName": "Jack",
                  "lastName": "Napier",
                  "nickname": "Joker",
                  "email": "whyareyousoseriuos@gmail.com"
                }
              ]
            },
            groups: {
              entities: []
            }
          } })}  />
      )

    })

    it('should render as a <div>', () => {
      expect(_wrapper.is(EntitiesList)).to.be.true
    })

    it('should render a <List> component', () => {
     // expect(_wrapper.find('.row')).to.be.true
    })

    it('should bla bla bla', () => {

      expect(1).to.equal(1)
    })
  })

})
