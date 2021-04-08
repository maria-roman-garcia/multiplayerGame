import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Home from "./Components/Home/Home";
import GameRoom from "./Components/GameRoom/GameRoom";
import Prueba from "./Components/PruebaPhaser/Prueba";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/:roomId" component={GameRoom} /> */}
          {/* <Route exact path="/Prueba" component={Prueba} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
