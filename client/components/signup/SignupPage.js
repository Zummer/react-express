import React from 'react';
import SignupForm from './SignupForm.js';
import {connect} from 'react-redux';
import {userSignupRequest} from '../../actions/signupActions';

const SignupPage = ({
  auth,
  userSignupRequest
}) =>
  <div className="row">
    <div className="col-md-4 col-md-offset-4">
      <SignupForm
        userSignupRequest={userSignupRequest}
        errors={auth.errors}
        isFetching={auth.isFetching}
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
    userSignupRequest
  }
)(SignupPage);
