import React, { PropTypes } from 'react'
import classes from '../Form.scss'

export const Errors = (props) => (
  <div className={classes.error}>
    {
      props.fieldsData.map((field, i) => (
        <span key={'err' + i}>
          {field.touched && field.error ? field.error : null}
        </span>
      ))
    }
  </div>
)

Errors.propTypes = {
  fieldsData: PropTypes.array
}

export default Errors
