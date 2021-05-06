import React from "react";
import { Route, Redirect } from "react-router-dom";

// ...rest berisikan path dan exact
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        // isAtuthenticated - jika user sudah login
        // restricted = jika user sudah login maka tidak boleh masuk ke halaman tersebut
        isAuthenticated && restricted ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
