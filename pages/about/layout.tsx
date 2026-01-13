import React from 'react';
import { Outlet, NavLink, useLocation, Navigate } from 'react-router-dom';

const aboutTabs = [
  { id: 'story', label: 'Story', path: '/about/story' },
  { id: 'branch', label: 'Branch', path: '/about/branch' },
  { id: 'b2b', label: 'B2B', path: '/about/b2b' },
];

const AboutLayout: React.FC = () => {
  const location = useLocation();

  // Redirect /about to /about/story
  if (location.pathname === '/about' || location.pathname === '/about/') {
    return <Navigate to="/about/story" replace />;
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Tab Navigation - Fixed */}
      <div
        style={{
          position: 'sticky',
          top: 'var(--header-h)',
          zIndex: 40,
          background: 'var(--cream)',
          borderBottom: '1px solid #000',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            height: '48px',
          }}
        >
          {aboutTabs.map((tab, index) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              style={({ isActive }) => ({
                flex: 1,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? '#000' : 'var(--warm-gray)',
                background: isActive ? 'rgba(0,0,0,0.03)' : 'transparent',
                borderRight: index < aboutTabs.length - 1 ? '1px solid #000' : 'none',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              })}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Content Area - Renders child routes */}
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AboutLayout;
