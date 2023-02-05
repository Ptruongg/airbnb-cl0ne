import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Search from '../Search';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const newTab = (url) => {
    window.open(url, '_blank', 'noopener, noreferrer')
  }
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
            <img src="https://www.codingexercises.com/img/2019-10-09/build-an-airbnb-clone-with-bootstrap-4.png"></img>
          </NavLink>
        </div>
        <div className='searchBar'>
          <Search />
        </div>
        <div className='aboutMe'>
          <div className='github' onClick={() => newTab('https://github.com/Ptruongg/airbnb-cl0ne')}>
            Github
          </div>
          <div className='name'>
            Developed by Philip Truong
            </div>
        </div>
          {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
