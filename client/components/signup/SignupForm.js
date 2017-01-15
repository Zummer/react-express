import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';

class SignupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      timezone: ''
    }
  }

  onChange(e){
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  onSubmit(e){
    e.preventDefault();
    this.props.userSignupRequest(this.state); 
  }

  render(){
    const options = map(timezones, (val, key)=>
      <option key={val} value={val}>{key}</option>
    );

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h1>Присоединяйтесь!</h1>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.onChange.bind(this)}
            className="form-control"
            name="username"
            type="text"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            value={this.state.email}
            onChange={this.onChange.bind(this)}
            className="form-control"
            name="email"
            type="text"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.onChange.bind(this)}
            className="form-control"
            name="password"
            type="text"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Password Confirmation</label>
          <input
            value={this.state.passwordConfirm}
            onChange={this.onChange.bind(this)}
            className="form-control"
            name="passwordConfirm"
            type="text"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Timezone</label>
          <select
            value={this.state.timezone}
            onChange={this.onChange.bind(this)}
            className="form-control"
            name="timezone"
            type="text"
          >
            <option value="" disabled>Выберите свой часовой пояс</option>
            {options}
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
