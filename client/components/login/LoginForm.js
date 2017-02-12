import React from 'react';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from 'validations/login';
import {setLoginState, login} from 'actions';
import {withRouter} from 'react-router';

const LoginForm = ({
  data,
  errors,
  setLoginState,
  login,
  isFetching,
  router
}) => {

  const isValid = () => {
    const {errors, isValid} = validateInput(data);

    if (!isValid) {
      setLoginState({errors});

    }

    return isValid;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
    try {
        const action = await login(data);
        if (action.type == LOGIN_SUCCESS) {
          router.push('/');

        }
      } catch (error) {
        console.log(error);

      }
    }
  }

  const onChange = (e) => {
    const {name, value} = e.target;
    let newStateErrors = {...errors};
    delete newStateErrors[name];

    setLoginState({
      data: {...data, [name]: value},
      errors: newStateErrors

    });
  }

  // console.log(router);

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>

      <TextFieldGroup
        name="identifier"
        label='Username / Email'
        value={data.identifier}
        error={errors.identifier}
        onChange={onChange}
      />

    <TextFieldGroup
      name="password"
      label='Password'
      value={data.password}
      error={errors.password}
      onChange={onChange}
      type="password"
    />

  <div className="form-group">
    <button
      className="btn btn-primary btn-lg"
      disabled={isFetching}
    >
      Login
    </button>
  </div>
    </form>
  );
}

LoginForm.propTypes = {
  setLoginState: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
  router: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired,
  errors: React.PropTypes.object,
  isFetching: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.login.errors,
  data: state.login.data,
  isFetching: state.login.isFetching
});

export default withRouter(connect(
  mapStateToProps,
  {
    setLoginState,
    login
  }
)(LoginForm));
