import React from 'react';
import SignupForm from './SignupForm.js';
import {connect} from 'react-redux';
import {userSignupRequest} from '../../actions/signupActions';
import {addFlashMessage}  from '../../actions/flashMessages';

const SignupPage = ({
  auth,
  userSignupRequest,
  addFlashMessage
}) =>
  <div className="row">
    <div className="col-md-4 col-md-offset-4">
      <SignupForm
        userSignupRequest={userSignupRequest}
        errors={auth.errors}
        isFetching={auth.isFetching}
        addFlashMessage={addFlashMessage}
      />
    </div>
  </div>
  ;

SignupPage.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    userSignupRequest,
    addFlashMessage
  }
)(SignupPage);
