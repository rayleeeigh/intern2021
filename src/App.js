import React, { Component } from "react";
import "./App.css";
import Formpage from "./components/Form";
import Login from "./components/Login";
import ResetPass from "./components/resetpassword";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/form" component={Formpage} />
          <Route path="/login" component={ResetPass} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
