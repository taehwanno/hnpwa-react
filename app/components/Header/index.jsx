import React from 'react';
import { NavLink } from 'react-router-dom';

import hnpwaLogo from 'assets/images/hnpwa-logo.png';
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
      <img className="Header__logo" src={hnpwaLogo} alt="HNPWA Logo" />
    </nav>
  );
}

export default Header;
