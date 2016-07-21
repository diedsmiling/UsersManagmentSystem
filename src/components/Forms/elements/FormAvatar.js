import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'

export const FormAvatar = (props) => (
  <Avatar backgroundColor="#3498db" style={{marginRight: 15}} size={40} >
    {props.letter}
  </Avatar>
)

FormAvatar.propTypes = {
  letter: PropTypes.string
}
export default FormAvatar
