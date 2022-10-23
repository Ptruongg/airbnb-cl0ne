import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id='navBarRight'>
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div id='navBarRightLoad'>
          <div id='loginButtonDiv'>
            <LoginFormModal />
            <div><NavLink id='signUp' to="/signup">Sign Up</NavLink></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <nav>
      <div id="home">

        <div id='logo'>
          <NavLink exact to="/">
            <img src="https://hospitalitydesign.com/wp-content/uploads/Airbnb-logo.png"></img>
          </NavLink>
        </div>
          {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
