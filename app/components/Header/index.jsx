import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <nav className="Header">
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/news/1"
      >
        Top
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/newest/1"
      >
        New
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/show/1"
      >
        Show
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/ask/1"
      >
        Ask
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/jobs/1"
      >
        Jobs
      </NavLink>
      <img
        className="Header__logo"
        src="https://raw.githubusercontent.com/tastejs/hacker-news-pwas/b3f3d40b9e4bd385dbb973d238ce207aed1f60eb/media/logo.png"
        alt="HNPWA Logo"
      />
    </nav>
  );
}

export default Header;
