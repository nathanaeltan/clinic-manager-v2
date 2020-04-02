import React, { Fragment } from "react";
// React Router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Component Imports
import Navbar from "./components/layout/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import "typeface-roboto";
import "./App.css";
function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Login} />
        <Switch>
          <Route exact path="/register" component={Register} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
