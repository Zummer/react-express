import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {addFlashMessage} from 'actions';
import shortid from 'shortid';

const requireAuth = (AnyComposedComponent) => {
  class Authenticate extends React.Component {
    componentWillMount () {
      const {
        isAuthenticated,
        addFlashMessage,
        router
      } = this.props;

      if (!isAuthenticated) {
        addFlashMessage({
          id: shortid(),
          type: 'error',
          text: 'You need to login to access this page'
        });
        router.push('/login');
      }
    }

    componentWillUpdate (nextProps) {
      const {router} = this.props;
      if(!nextProps.isAuthenticated) {
        router.push('/login');
      }
    }

    render () {
      return (
        <AnyComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  })

  return withRouter(connect(mapStateToProps, {
    addFlashMessage
  })(Authenticate));

}

export default requireAuth;
