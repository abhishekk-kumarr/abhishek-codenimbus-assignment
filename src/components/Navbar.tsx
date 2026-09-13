import React from 'react';
import { NavTab } from '../types';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  return (
    <header className="wed010-navbar-section" id="navbar">
      <nav className="wed010-navbar" aria-label="Main Navigation">
        <ul className="wed010-navbar-list shared-navbar" role="menubar">
          <li role="none">
            <button
              id="nav-home-btn"
              role="menuitem"
              onClick={() => onSelectTab('home')}
              className={`shared-nav-item ${currentTab === 'home' ? 'active' : ''}`}
            >
              <span className="nav-label">Home</span>
            </button>
          </li>
          <li role="none">
            <button
              id="nav-about-btn"
              role="menuitem"
              onClick={() => onSelectTab('about')}
              className={`shared-nav-item ${currentTab === 'about' ? 'active' : ''}`}
            >
              <span className="nav-label">About</span>
            </button>
          </li>
          <li role="none">
            <button
              id="nav-gallery-btn"
              role="menuitem"
              onClick={() => onSelectTab('gallery')}
              className={`shared-nav-item ${currentTab === 'gallery' ? 'active' : ''}`}
            >
              <span className="nav-label">Gallery</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
