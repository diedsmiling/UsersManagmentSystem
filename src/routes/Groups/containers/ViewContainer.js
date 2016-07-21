import { reduxForm } from 'redux-form'
import { fetchGroup, fetchUsers, updateData } from '../modules/groups'
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
    errors.title = 'First name is empty'
  }
  if (values.users && values.users.length === 0) {
    errors.title = 'Users are empty'
  }

  return errors
}

const mapActionCreators = (dispatch) => {
  return {
    bootstrap (id) {
      dispatch(fetchGroup(id))
      dispatch(fetchUsers())
    },
    onSubmit (data) {
      dispatch(updateData(data))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data, users, updated } = state.group
  return {
    updated,
    childEntities: users.map(user => {
      user.diplayName = user.firstName + ' ' + user.lastName
      return user
    }),
    initialValues: data,
    letter: data.title ? data.title.charAt(0).toUpperCase() : '',
    title: data.title ? data.title : '',
    subTitle: 'Edit group',
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
