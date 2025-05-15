import React from 'react';
import './Title.css'; // Optional (or use inline styles)

interface TitleProps {
  children: React.ReactNode;
  className?: string; // Optional additional classes
}

const Title: React.FC<TitleProps> = ({ children, className = '' }) => {
  return (
    <h1 className={`title ${className}`}>
      {children}
    </h1>
  );
};

export default Title;