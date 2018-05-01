import React, { PropTypes } from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, authExists, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log(authExists); // redirect to /StartPage if not authed
      return ((authExists) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/StartPage',
          }}
        />
      ));
      }
    }
  />
);


PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired, // 這個不太確定
  authExists: PropTypes.bool.isRequired,
};

export default connect(({ firebase: { auth } }) => ({
  authExists: !!auth && !!auth.uid,
}))(PrivateRoute);
