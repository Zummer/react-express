import React from 'react';
import {connect} from 'react-redux';
import FlashMessage from './FlashMessage';

const FlashMessagesList = ({
  messages
}) => {
  const genMessages = messages.map(message=>
    <FlashMessage i
      key={message.id}
      message={message}
    />
  )
  return (
    <div>
      {genMessages}
    </div>
  )
}


FlashMessagesList.propTypes = {
  messages: React.PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  messages: state.flashMessages
});

export default connect(mapStateToProps)(FlashMessagesList);
