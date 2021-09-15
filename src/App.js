import React, { Component } from "react";
import Formpage from "./components/Form";
import Login from "./components/Login";
import ResetPass from "./components/resetpassword";

import { BrowserRouter, Switch, Route } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/form" component={Formpage} />
          <Route path="/reset" component={ResetPass} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
