import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { fetchSearchedSpots } from '../../store/search';
import './Navigation.css';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let isCancelled = false
    const currLocation = location.pathname
    if (!isCancelled && !currLocation.startsWith("/searched")) setSearchInput("")

  }, [location])

  const handleSearch = async (e) => {
    // e.preventDefault();
    dispatch(fetchSearchedSpots(searchInput))
    history.push(`/searched?input=${searchInput}`);

  };


  // const newTab = (url) => {
  //   window.open(url, '_blank', 'noopener, noreferrer')
  // }
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
          <button id='loginButtonDiv' style={{ width: "100px", borderRadius: "2em", borderColor: "#ff385c", height: "35px", alignItems: "center", justifyContent: "center" }}>
            <LoginFormModal />
          </button>
          <button id='signUpButtonDiv' style={{ width: "100px", borderRadius: "2em", borderColor: "#ff385c", height: "35px", alignItems: "center", justifyContent: "center" }}>
            <NavLink id='signUp' to="/signup" style={{ fontWeight: "bold"}}>Sign Up</NavLink>
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
        <div className="header-search-container" style={{ borderColor: "pink" }}>
          <div className="search-input-container" >
            <input
              className="search-input"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder= "        Search by city..."
              onKeyPress={(e) => {
                if (e.key === "Enter") window.location.reload(handleSearch());

              }}
              style={{borderColor: "#ff385c"}}
            />
          </div>
          <button className="magnify" onClick={() => window.location.reload(handleSearch())}>
            <i className='fa-sharp fa-solid fa-magnifying-glass'></i>
          </button>
        </div>
        {isLoaded && sessionLinks}
      </div>

    </nav>
  );
}

export default Navigation;
