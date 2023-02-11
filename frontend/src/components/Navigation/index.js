import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Search from '../Search';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();

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
        <div id='signUpandLoginBut'>
          <button id='loginButtonDiv' style={{width: "100px", borderRadius: "2em", borderColor: "#ff385c", height: "35px", alignItems: "center", justifyContent: "center"}}>
            <LoginFormModal />
          </button>
          <button id='signUpButtonDiv' style={{width: "100px", borderRadius: "2em", borderColor: "#ff385c", height: "35px", alignItems: "center", justifyContent: "center"}}>
            <NavLink id='signUp' to="/signup">Sign Up</NavLink>
          </button>
        </div>
      </>
    );
  }


  return (
    <nav>
      <div id="home">
        <div id='logo'>
          <NavLink to="/">
            <img src="https://www.codingexercises.com/img/2019-10-09/build-an-airbnb-clone-with-bootstrap-4.png" ></img>
          </NavLink>
        </div>
        {/* <div className='aboutMe'>
          <div className='github' onClick={() => newTab('https://github.com/Ptruongg/airbnb-cl0ne')}>
            Github
          </div>
          <div className='name'>
            Developed by Philip Truong
          </div>
        </div> */}
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
