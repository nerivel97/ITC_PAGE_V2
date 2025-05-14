import React from 'react';

interface HamburgerIconProps {
  isOpen: boolean;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen }) => {
  return (
    <div style={{ width: '24px', height: '24px', position: 'relative' }}>
      <span 
        style={{
          display: 'block',
          position: 'absolute',
          height: '2px',
          width: '100%',
          background: 'white',
          opacity: '1',
          left: '0',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
          top: isOpen ? '11px' : '4px',
          transition: 'all 0.3s ease'
        }}
      />
      <span 
        style={{
          display: 'block',
          position: 'absolute',
          height: '2px',
          width: '100%',
          background: 'white',
          opacity: isOpen ? '0' : '1',
          left: '0',
          top: '11px',
          transition: 'all 0.1s ease'
        }}
      />
      <span 
        style={{
          display: 'block',
          position: 'absolute',
          height: '2px',
          width: '100%',
          background: 'white',
          opacity: '1',
          left: '0',
          transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)',
          top: isOpen ? '11px' : '18px',
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  );
};

export default HamburgerIcon;