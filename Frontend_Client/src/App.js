import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import Home from "./Components/Home/Home";
import GameRoom from "./Components/GameRoom/GameRoom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:roomId" component={GameRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;