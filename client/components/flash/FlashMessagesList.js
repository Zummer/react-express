import React from 'react';
import {connect} from 'react-redux';
import FlashMessage from './FlashMessage';
import {deleteFlashMessage} from '../../actions/flashMessages';

const FlashMessagesList = ({
  messages,
  deleteFlashMessage
}) => {
  const genMessages = messages.map(message=>
    <FlashMessage 
      key={message.id}
      onClick={()=>deleteFlashMessage(message.id)}
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
  messages: React.PropTypes.array.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired

}

const mapStateToProps = state => ({
  messages: state.flashMessages
});

export default connect(mapStateToProps, {
  deleteFlashMessage
})(FlashMessagesList);
