import React from "react";
import { Route, Redirect } from "react-router-dom";

// ...rest berisikan path dan exact
const PrivateRoute = ({
  component: Component,
  author,
  otherAuthor,
  ...rest
}) => {
  const isAuthenticated = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <Route
      {...rest}
      render={(props) =>
        (isAuthenticated && role === author) || role === otherAuthor ? (
          <Component {...props} />
        ) : !isAuthenticated && !role === author ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};

export default PrivateRoute;
