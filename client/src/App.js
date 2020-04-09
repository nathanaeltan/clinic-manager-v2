import React, { Fragment, useEffect } from "react";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Component Imports
import Navbar from "./components/layout/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Alerts from "./components/layout/Alert";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "typeface-roboto";
import "./App.css";
import Calendar from "./components/Calendar";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// Alert Options

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            <Navbar />
            <Alerts />
            <Route exact path="/" component={Login} />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Calendar} />
            </Switch>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
