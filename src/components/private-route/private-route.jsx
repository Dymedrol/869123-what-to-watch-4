import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {LoginStatus,AppRoute} from "../../const.js";

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === LoginStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.LOGIN} />
        );
      }}
    />
  );
};

// PrivateRoute.propTypes = {
//   authorizationStatus: PropTypes.string.isRequired,
//   exact: PropTypes.bool.isRequired,
//   path: PropTypes.string.isRequired,
//   render: PropTypes.func.isRequired,
// };

export {PrivateRoute};
