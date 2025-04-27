import React from 'react';

const Header: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70px',
    backgroundColor: '#2F855A', // 어두운 초록색
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: '18px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    fontFamily: "'Press Start 2P', cursive",
    letterSpacing: '1px'
  };
  
  return (
    <header style={headerStyle}>
      🏕️ PIXEL CAMPFIRE 🔥
    </header>
  );
};

export default Header;