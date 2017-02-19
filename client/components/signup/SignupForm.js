import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import validateInput from 'validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import classNames from 'classnames';
import shortid from 'shortid';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {addFlashMessage}  from '../../actions/flashMessages';
import isEmpty from 'lodash/isEmpty';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  userSignupRequest,
  checkUserExists,
  setSignUpState
} from '../../actions/signupActions';

const SignupForm = ({
  errors,
  data,
  isFetching,
  router,
  setSignUpState,
  userSignupRequest,
  checkUserExists,
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

  const handleCheckUserExists = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      checkUserExists(field, val);
    }
  }

  const isValid = () => {
    const {errors, isValid} = validateInput(data);

    if (!isValid){
      setSignUpState({errors});

    }

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
          router.push('/');

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
        name="username"
        onChange={onChange}
        onBlur={handleCheckUserExists}
        value={data.username}
        error={errors.username}
      />

    <TextFieldGroup
      label="Email"
      name="email"
      onChange={onChange}
      onBlur={handleCheckUserExists}
      value={data.email}
      error={errors.email}
    />

  <TextFieldGroup
    label="Password"
    name="password"
    onChange={onChange}
    value={data.password}
    error={errors.password}
    type="password"
  />

<TextFieldGroup
  label="Password confirmation"
  name="passwordConfirm"
  onChange={onChange}
  value={data.passwordConfirm}
  error={errors.passwordConfirm}
  type="password"
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
  errors: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  router: React.PropTypes.object.isRequired,
  setSignUpState: React.PropTypes.func.isRequired,
  userSignupRequest: React.PropTypes.func.isRequired,
  checkUserExists: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.signup.errors,
  isFetching: state.signup.isFetching,
  data: state.signup.data
});

export default withRouter(connect(
  mapStateToProps,
  {
    userSignupRequest,
    addFlashMessage,
    checkUserExists,
    setSignUpState
  }
)(SignupForm));
