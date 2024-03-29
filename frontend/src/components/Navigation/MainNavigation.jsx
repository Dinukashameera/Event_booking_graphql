import React,{useContext} from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';
import AuthContext from '../../context/auth_context'
function MainNavigation() {
  const {token, logout} = useContext(AuthContext)
  return (
    <header className="main-navigation">
    <div className="main-navigation__logo">
      <h1>EasyEvent</h1>
    </div>
    <nav className="main-navigation__items">
      <ul>
        <li>
          { !token && <NavLink to="/auth">Authenticate</NavLink>}
        </li>
        <li>
          <NavLink to="/events">Events</NavLink>
        </li>
        { token &&
        <React.Fragment>
        <li>
           <NavLink to="/bookings">Bookings</NavLink> 
        </li>
        <li>
           <button onClick={logout}>Logout</button>
        </li>

        </React.Fragment>
        }
      </ul>
    </nav>
  </header>
  )
}

export default MainNavigation
