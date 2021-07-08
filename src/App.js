import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "../src/helpers/PrivateRoute";
import PublicRoute from "../src/helpers/PublicRoute";

import SignUp from "./pages/auth/SignUp/SignUp";
import SignIn from "./pages/auth/SignIn/SignIn";
import Home from "./pages/main/Home/Home";
import MovieDetail from "./pages/main/MovieDetail/MovieDetail";
import OrderPage from "./pages/main/OrderPage/OrderPage";
import PaymentPage from "./pages/main/PaymentPage/PaymentPage";
import ProfilePage from "./pages/main/Profile Page/ProfilePage";
import ManageMovie from "./pages/main/ManageMovie/ManageMovie";
import AccountActivation from "./pages/auth/AccountActivation/AccountActivation";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <PublicRoute
                restricted={true}
                path="/sign-up"
                exact
                component={SignUp}
              />{" "}
              <PublicRoute
                restricted={true}
                path="/sign-in"
                exact
                component={SignIn}
              />
              <PublicRoute path="/" exact component={Home} />
              <PublicRoute path="/movie/detail" exact component={MovieDetail} />
              <PrivateRoute
                author="user"
                path="/order"
                exact
                component={OrderPage}
              />
              <PrivateRoute
                author="user"
                path="/payment"
                exact
                component={PaymentPage}
              />
              <PrivateRoute
                author="user"
                otherAuthor="admin"
                path="/profile"
                exact
                component={ProfilePage}
              />
              <PrivateRoute
                author="admin"
                path="/manage/movie"
                exact
                component={ManageMovie}
              />
              <Route
                path="/account/activation"
                exact
                component={AccountActivation}
              />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
