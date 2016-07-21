import { reduxForm } from 'redux-form'
import {
  fetchUsers,
  saveData,
  clearData,
  initialState } from '../modules/groups'
import { findIndex } from 'lodash'
import Form from 'components/Forms/Form'

const fields = [
  'id',
  'title',
  'users[].id',
  'users[].firstName',
  'users[].lastName',
  'users[].nickname',
  'users[].email'
]

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Title is empty'
  }

  if (values.users && values.users.length === 0) {
    errors.title = 'Users are empty'
  }

  return errors
}

const mapActionCreators = (dispatch) => {
  return {
    bootstrap (id) {
      dispatch(clearData())
      dispatch(fetchUsers())
    },
    onSubmit (data) {
      dispatch(saveData(data))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { users, updated } = state.group
  return {
    updated,
    childEntities: users.map(user => {
      user.diplayName = user.firstName + ' ' + user.lastName
      return user
    }),
    initialValues: initialState.data,
    letter: '+',
    title: 'New group',
    subTitle: 'Add new group',
    childEntitiesLiteral: 'users',
    fieldsInfo: [
      {
        hintText: 'Enter title',
        floatingLabelText: 'Title',
        fieldName: 'title'
      }
    ]
  }
}

export default reduxForm(
  {
    form: 'AddingLayerForm',
    fields,
    validate,
    selectChildEntity: function (user) {
      const { users } = this.props.fields
      const index = findIndex(users, {id: {value: user.id}})
      if (index > -1) {
        users.removeField(index)
      } else {
        users.addField(user)
      }
    }
  },
  mapStateToProps,
  mapActionCreators
)(Form)
