import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';

function Header() {
  return (
    <nav className="Header">
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/news"
      >
        Top
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/newest"
      >
        New
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/show"
      >
        Show
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/ask"
      >
        Ask
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/jobs"
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
