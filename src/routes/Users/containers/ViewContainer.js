import { reduxForm } from 'redux-form'
import { fetchUser, fetchGroups, updateData } from '../modules/users'
import { findIndex } from 'lodash'
import Form from 'components/Forms/Form'

const fields = [
  'id',
  'firstName',
  'lastName',
  'email',
  'nickname',
  'groups[].id',
  'groups[].title'
]
const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'First name is empty'
  }
  if (!values.lastName) {
    errors.lastName = 'Last name is empty'
  }

  if (!values.email) {
    errors.email = 'Email is empty'
  }

  if (!values.nickname) {
    errors.nickname = 'Nickname is empty'
  }

  if (values.groups && values.groups.length === 0) {
    errors.nickname = 'Groups are empty'
  }

  return errors
}

const mapActionCreators = (dispatch) => {
  return {
    bootstrap (id) {
      dispatch(fetchUser(id))
      dispatch(fetchGroups())
    },
    onSubmit (data) {
      dispatch(updateData(data))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { data, groups, updated } = state.user
  return {
    updated,
    childEntities: groups.map(group => {
      group.diplayName = group.title
      return group
    }),
    initialValues: data,
    letter: data.firstName ? data.firstName.charAt(0).toUpperCase() : '',
    title: data.firstName ? data.firstName + ' ' + data.lastName : '',
    subTitle: data.nickname ? data.nickname : '',
    childEntitiesLiteral: 'groups',
    fieldsInfo: [
      {
        hintText: 'Enter first name',
        floatingLabelText: 'First name',
        fieldName: 'firstName'
      },
      {
        hintText: 'Enter last name',
        floatingLabelText: 'Last name',
        fieldName:'lastName'
      },
      {
        hintText: 'Enter email',
        floatingLabelText: 'Email',
        fieldName: 'email'
      },
      {
        hintText: 'Enter nickname',
        floatingLabelText: 'Nickname',
        fieldName: 'nickname'
      }
    ]
  }
}

export default reduxForm(
  {
    form: 'AddingLayerForm',
    fields,
    validate,
    selectChildEntity: function (group) {
      const { groups } = this.props.fields
      const index = findIndex(groups, {id: {value: group.id}})
      if (index > -1) {
        groups.removeField(index)
      } else {
        groups.addField(group)
      }
    }
  },
  mapStateToProps,
  mapActionCreators
)(Form)
