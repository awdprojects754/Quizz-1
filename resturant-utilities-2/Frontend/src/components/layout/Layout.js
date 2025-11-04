import React from 'react';
import EnhancedNavbar from './EnhancedNavbar';
import EnhancedFooter from './EnhancedFooter';

const Layout = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <EnhancedNavbar />
      <main className="flex-1 pt-16"> {/* Account for fixed navbar */}
        {children}
      </main>
      {showFooter && <EnhancedFooter />}
    </div>
  );
};

export default Layout;