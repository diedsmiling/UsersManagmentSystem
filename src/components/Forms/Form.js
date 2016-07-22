import React, { PropTypes } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
import classes from './Form.scss'
import RaisedButton from 'material-ui/RaisedButton'
import { findIndex } from 'lodash'
import FormAvatar from './elements/FormAvatar'
import Errors from './elements/Errors'

class Form extends React.Component {
  componentDidMount () {
    this.props.bootstrap(this.props.params.id)
  }

  render () {
    const {
      childEntitiesLiteral,
      fields,
      letter,
      title,
      subTitle,
      handleSubmit,
      childEntities,
      updated,
      selectChildEntity,
      fieldsInfo
      } = this.props

    const fieldsData = fieldsInfo.map((fieldItem) => {
      return {
        ... fieldItem,
        ... fields[fieldItem.fieldName]

      }
    })

    return (
      <div className="row">
        <div className="col-sm-12">
          <Card>
            <CardHeader
              title={title}
              subtitle={subTitle}
              avatar={<FormAvatar letter={letter} />}
            />
            <form onSubmit={handleSubmit}>
              <CardText>
                { updated ? <span className={classes.success}> Updated! </span> : null}
                <Errors fieldsData={fieldsData} />
                <div className="form-group">
                  {
                    fieldsData.map((field, i) => (
                      <TextField key={'field_' + i}
                        style={{width: '100%'}}
                        {...field}
                      />
                    ))
                  }
                </div>
              </CardText>
              <div style={{display: 'table', padding: 10}}>
                <div className={classes['group-wrapper']}>
                  {
                    childEntities.map(entity => (

                      <Chip
                        style={{margin: '4px', cursor: 'pointer'}}
                        backgroundColor={
                          findIndex(
                            fields[childEntitiesLiteral],
                             {id: {value: entity.id}}
                          ) > -1 ? '#3c9cdd' : '#E0E0E0'
                        }
                        labelColor={
                          findIndex(
                            fields[childEntitiesLiteral],
                            {id: {value: entity.id}}
                          ) > -1 ? '#fff' : '#3d4252'
                        }
                        key={entity.id}
                        onClick={() => { selectChildEntity.bind(this)(entity) }}
                      >
                        {entity.diplayName}
                      </Chip>
                    ))
                  }
                </div>
              </div>
              <RaisedButton
                type="submit"
                label="Submit"
                style={{position: 'relative', right: 10, margin: 20}} />
            </form>
          </Card>
        </div>
      </div>
    )
  }

  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    bootstrap: PropTypes.func,
    fields: PropTypes.object.isRequired,
    letter: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    selectChildEntity: PropTypes.func.isRequired,
    fieldsInfo: PropTypes.array.isRequired,
    updated: PropTypes.bool.isRequired,
    childEntitiesLiteral: PropTypes.string.isRequired,
    childEntities: PropTypes.array.isRequired

  }
}

export default Form
