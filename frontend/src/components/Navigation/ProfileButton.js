import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useHistory } from "react-router-dom"
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <>
    <div className="button">
      <button className="navBar" onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle user_icon"></i>
      </button>
      {showMenu && (
        <div id="menu">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <div>
          <Link to="/create" id='dropdown'>
            Host Your Home
          </Link>
          </div>
          <div>
          <Link to="/spots/currentUser/reviews" id="dropdown">
            My Reviews
          </Link>
          </div>
          <li>
            <div onClick={logout}>Log Out</div>
          </li>
        </div>
      )}
    </div>
    </>
  );
}

export default ProfileButton;
