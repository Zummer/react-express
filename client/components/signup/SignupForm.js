import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import classNames from 'classnames';
import shortid from 'shortid';
import {browserHistory} from 'react-router';
import {SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE} from '../../constants';
import {connect} from 'react-redux';
import {userSignupRequest, isUserExists} from '../../actions/signupActions';
import {addFlashMessage}  from '../../actions/flashMessages';

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errors: {},
      data:{
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        timezone: ''
      }
    }
  }

  onChange(e){
    const {name, value} = e.target;
    const {errors} = this.state;
    delete errors[name];

    this.setState({
      errors,
      data: {
        ...this.state.data,
        [name]: value
      }
    });
  }

  checkUserExists (e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists()
        .then((res) => {

        });
    }
  }

  isValid(){
    const {errors, isValid} = validateInput(this.state.data);

    if(!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  onSubmit(e){
    e.preventDefault();

    if (this.isValid()){
      this.props.userSignupRequest(this.state.data)
        .then((action) => {
          if (action.type == SIGNUP_SUCCESS) {
            this.props.addFlashMessage({
              id: shortid(),
              type: 'success',
              text: 'You signed succesfully. Welcome!'
            });
            browserHistory.push('/');

          } else if (action.type == SIGNUP_FAILURE) {
            //alert("Ошибка!")

          }
        });
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      errors: nextProps.errors
    })
  }

  render(){
    const options = map(timezones, (val, key)=>
      <option key={val} value={val}>{key}</option>
    );

    const {errors, data} = this.state;
    const {isFetching} = this.props;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h1>Присоединяйтесь!</h1>

        <TextFieldGroup
          label="Username"
          field="username"
          onChange={this.onChange.bind(this)}
          checkUserExists={this.checkUserExists.bind(this)}
          value={data.username}
          error={errors.username}
        />

      <TextFieldGroup
        label="Email"
        field="email"
        onChange={this.onChange.bind(this)}
        checkUserExists={this.checkUserExists.bind(this)}
        value={data.email}
        error={errors.email}
      />

    <TextFieldGroup
      label="Password"
      field="password"
      onChange={this.onChange.bind(this)}
      value={data.password}
      error={errors.password}
    />

  <TextFieldGroup
    label="Password confirmation"
    field="passwordConfirm"
    onChange={this.onChange.bind(this)}
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
    value={this.state.data.timezone}
    onChange={this.onChange.bind(this)}
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
    disabled={isFetching}
  >
    Sign up
  </button>
</div>
    </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.auth.errors,
  isFetching: state.auth.isFetching
});

export default connect(
  mapStateToProps,
  {
    userSignupRequest,
    addFlashMessage,
    isUserExists
  }
)(SignupForm);
