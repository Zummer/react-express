import React from 'react';
import LoginForm from './LoginForm';

const LoginPage  = (props, context) => {
  //console.log(props);
  //console.log(context);
  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
