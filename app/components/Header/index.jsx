import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import hnpwaLogo from 'assets/images/hnpwa-logo.png';
import './Header.scss';

export function makeIsActive(path) {
  return function isActive(match, location) {
    return location.pathname.indexOf(path) !== -1;
  };
}

function Header() {
  return (
    <nav className="Header">
      <Link to="/news/1" href="/news/1">
        <img className="Header__logo" src={hnpwaLogo} alt="HNPWA Logo" />
      </Link>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/news/1"
        isActive={makeIsActive('/news')}
      >
        Top
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/newest/1"
        isActive={makeIsActive('/newest')}
      >
        New
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/show/1"
        isActive={makeIsActive('/show')}
      >
        Show
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/ask/1"
        isActive={makeIsActive('/ask')}
      >
        Ask
      </NavLink>
      <NavLink
        activeClassName="Header__navlink--active"
        className="Header__navlink"
        to="/jobs/1"
        isActive={makeIsActive('/jobs')}
      >
        Jobs
      </NavLink>
      <a href="https://github.com/taehwanno/hnpwa-react" target="_blank" rel="noopener noreferrer">
        <span className="Header__title">HNPWA with React</span>
      </a>
    </nav>
  );
}

export default Header;
