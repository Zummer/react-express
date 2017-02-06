import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import classNames from 'classnames';
import shortid from 'shortid';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {addFlashMessage}  from '../../actions/flashMessages';
import isEmpty from 'lodash/isEmpty';
import {
  SIGNUP_REQUEST, 
  SIGNUP_SUCCESS, 
  SIGNUP_FAILURE,
  userSignupRequest, 
  isUserExists, 
  setSignUpState
} from '../../actions/signupActions';

const SignupForm = ({
  errors,
  data,
  isFetching,
  router,
  setSignUpState,
  userSignupRequest,
  isUserExists,
  addFlashMessage
}) => {
  const onChange = (e) => {
    const {name, value} = e.target;
    let newStateErrors = {...errors};
    delete newStateErrors[name];

    setSignUpState({
      data: {...data, [name]: value},
      errors: newStateErrors

    });
  }

  const checkUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      isUserExists(field, val);
    }
  }

  const isValid = () => {
    const {errors, isValid} = validateInput(data);

    setSignUpState({
      data,
      errors

    });
    return isValid;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (isValid()){
      try {
        const action = await userSignupRequest(data);
        if (action.type == SIGNUP_SUCCESS) {
          addFlashMessage({
            id: shortid(),
            type: 'success',
            text: 'You signed succesfully. Welcome!'
          });
          browserHistory.push('/');

        }
      } catch (error) {
        console.log(error);

      }
    }
  }

  const options = map(timezones, (val, key)=>
    <option key={val} value={val}>{key}</option>
  );

  //const inputs = {};

  //const setRef = (key) => (node) => inputs[key] = node;

  return (
    <form onSubmit={onSubmit}>
      <h1>Присоединяйтесь!</h1>

      <TextFieldGroup
        label="Username"
        field="username"
        onChange={onChange}
        checkUserExists={checkUserExists}
        value={data.username}
        error={errors.username}
      />

    <TextFieldGroup
      label="Email"
      field="email"
      onChange={onChange}
      checkUserExists={checkUserExists}
      value={data.email}
      error={errors.email}
    />

  <TextFieldGroup
    label="Password"
    field="password"
    onChange={onChange}
    value={data.password}
    error={errors.password}
  />

<TextFieldGroup
  label="Password confirmation"
  field="passwordConfirm"
  onChange={onChange}
  value={data.passwordConfirm}
  error={errors.passwordConfirm}
/>

<div className={
  classNames("form-group", {
    "has-error": errors.timezone
  }
  )}>
  <label className="control-label">Timezone</label>
  <select
    value={data.timezone}
    onChange={onChange}
    className="form-control"
    name="timezone"
    type="text"
  >
    <option value="" disabled>Выберите свой часовой пояс</option>
    {options}
  </select>
  {errors.timezone && <span className="help-block">{errors.timezone}</span>}
</div>
<div className="form-group">
  <button
    className="btn btn-primary btn-lg"
    disabled={isFetching || !isEmpty(errors)}
  >
    Sign up
  </button>
    </div>
  </form>
  );
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  isFetching: state.auth.isFetching,
  data: state.auth.data
});

export default connect(
  mapStateToProps,
  {
    userSignupRequest,
    addFlashMessage,
    isUserExists,
    setSignUpState
  }
)(SignupForm);
