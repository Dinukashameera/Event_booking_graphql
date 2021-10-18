import "./App.css";
import Auth from "./pages/Auth";
import Bookngs from "./pages/Bookings";
import Events from "./pages/Events";
import MainNavigation from "./components/Navigation/MainNavigation";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <MainNavigation />
         <main className='main-content'>
         <Switch>
            <Redirect from="/" to="auth" exact component={null} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/bookings" exact component={Bookngs} />
            <Route path="/events" exact component={Events} />
          </Switch>
         </main>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
