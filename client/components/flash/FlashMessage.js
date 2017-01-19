import React from 'react';
import classNames from 'classnames';

const FlashMessage = ({
  message: {
    id,
    type,
    text
  },
  onClick
}) => {
  return (
    <div className={
      classNames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })
    }>
    <button
      className="close"
      onClick={onClick}>
    <span>&times;</span>
    </button>
    {text}
  </div>
  )
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default FlashMessage;
