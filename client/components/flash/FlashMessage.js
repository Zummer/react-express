import React from 'react';
import classNames from 'classnames';

const FlashMessage = ({
  message: {
    id, 
    type, 
    text 
  }
}) => {
  return (
    <div className={
      classNames('alert', {
      'alert-success': type === 'success',
      'alert-danger': type === 'error'
      })
    }>
      {text}
    </div>
  )
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default FlashMessage;
