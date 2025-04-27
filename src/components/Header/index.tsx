import React from 'react';

const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    backgroundColor: '#2D3748',
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '24px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };
  
  return (
    <header style={headerStyle}>
      PIXEL CAMPFIRE
    </header>
  );
};

export default Header;