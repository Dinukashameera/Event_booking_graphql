import React, { useState } from "react";
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
import AuthContext from "./context/auth_context";

function App() {
  const [user, setUser] = useState({
    token: null,
    userId: null,
  });

  const login = (token, userId, tokenExpiration) => {
    setUser({
      token: token,
      userId: userId,
    });
  };

  const logout = () => {
    setUser({
      token: null,
      userId: null,
    });
  };

  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: user.token,
              login: login,
              logout: logout,
              userId: user.userId,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                {!user.token && <Redirect from="/" to="auth" exact />}
                {!user.token && <Redirect from="/bookings" to="auth" exact />}
                {user.token && <Redirect from="/auth" to="events" exact />}
                {user.token && <Redirect from="/" to="events" exact />}
                {!user.token && <Route path="/auth" exact component={Auth} />}
                {user.token && (
                  <Route path="/bookings" exact component={Bookngs} />
                )}
                <Route path="/events" exact component={Events} />
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
