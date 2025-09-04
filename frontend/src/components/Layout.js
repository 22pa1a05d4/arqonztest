import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FiGrid, 
  FiClipboard, 
  FiUsers, 
  FiMessageSquare, 
  FiSettings,
  FiMenu,
  FiX,
  FiBell,
  FiHelpCircle,
  FiChevronDown,
  FiLogOut,
  FiUser
} from 'react-icons/fi';

const Layout = ({ children }) => {
  console.log('Layout component rendering with children:', children);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const profileDropdownRef = useRef(null);

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FiGrid },
    { name: 'Task', href: '/tasks', icon: FiClipboard },
    { name: 'Mentors', href: '/mentors', icon: FiUsers },
    { name: 'Message', href: '/messages', icon: FiMessageSquare },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Overview';
    if (path === '/tasks') return 'Task';
    if (path === '/mentors') return 'Mentors';
    if (path === '/messages') return 'Message';
    if (path === '/settings') return 'Settings';
    if (path.startsWith('/tasks/')) return 'Detail Task';
    return 'DNX';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <div className="mobile-header">
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu />
        </button>
        <h1>{getPageTitle()}</h1>
        <div className="header-right">
          <div className="notification-icon">
            <FiBell />
            <div className="notification-badge"></div>
          </div>
          <div className="profile-dropdown" ref={profileDropdownRef}>
            <button 
              className="profile-avatar"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </button>
            {profileDropdownOpen && (
              <div className="profile-dropdown-menu">
                <div className="profile-info">
                  <div className="profile-name">{user?.name}</div>
                  <div className="profile-email">{user?.email}</div>
                </div>
                <Link to="/settings" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                  <FiSettings className="dropdown-icon" />
                  Settings
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  <FiLogOut className="dropdown-icon" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <div className="logo">
              <div className="logo-icon">DNX</div>
              <span className="logo-text">DNX</span>
            </div>
            <button 
              className="mobile-nav-close"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiX />
            </button>
          </div>
          
          <ul className="nav-menu">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="nav-item">
                  <Link
                    to={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="nav-icon" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="help-widget">
            <div className="help-icon">
              <FiHelpCircle />
            </div>
            <div className="help-title">Help Center</div>
            <div className="help-text">
              Having Trouble in Learning. Please contact us for more questions.
            </div>
            <button className="help-btn">Go To Help Center</button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">DNX</div>
          <span className="logo-text">DNX</span>
        </div>

        <ul className="nav-menu">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className="nav-item">
                <Link
                  to={item.href}
                  className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="help-widget">
          <div className="help-icon">
            <FiHelpCircle />
          </div>
          <div className="help-title">Help Center</div>
          <div className="help-text">
            Having Trouble in Learning. Please contact us for more questions.
          </div>
          <button className="help-btn">Go To Help Center</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="header">
          <div className="header-left">
            <h1>{getPageTitle()}</h1>
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <FiBell />
              <div className="notification-badge"></div>
            </div>
            <div className="profile-dropdown" ref={profileDropdownRef}>
              <button 
                className="profile-avatar"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </button>
              {profileDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <div className="profile-info">
                    <div className="profile-name">{user?.name}</div>
                    <div className="profile-email">{user?.email}</div>
                  </div>
                  <Link to="/settings" className="dropdown-item" onClick={() => setProfileDropdownOpen(false)}>
                    <FiSettings className="dropdown-icon" />
                    Settings
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <FiLogOut className="dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;


