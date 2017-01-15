import React from 'react';
import SignupForm from './SignupForm.js';
import {connect} from 'react-redux';
import {userSignupRequest} from '../../actions/signupActions';

const SignupPage = ({
  userSignupRequest
}) =>
  <div className="row">
    <div className="col-md-4 col-md-offset-4">
      <SignupForm
        userSignupRequest={userSignupRequest}
      />
    </div>
  </div>
  ;

export default connect(
  null,
  {
    userSignupRequest
  }
)(SignupPage);
