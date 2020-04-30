import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Error from "./pages/Error";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart/" component={Cart} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default App;
