import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logout} from 'actions';

const NavigationBar = ({
  isAuthenticated,
  logout
}) => {
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  }
  const userLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li><a href="logout" onClick={handleLogout}>Logout</a></li>
    </ul>

  );
  const guestLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li><Link to="signup">Sign up</Link></li>
      <li><Link to="login">Login</Link></li>
    </ul>

  );

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">Red Dice</Link>
        </div>
        {isAuthenticated ? userLinks : guestLinks}
        <div className="collapse navbar-collapse">
        </div>
      </div>
    </nav>

  );
}

NavigationBar.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired
}
const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated
});

export default connect(mapStateToProps, {
  logout
})(NavigationBar);
