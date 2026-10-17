import React from 'react';
import defaultLogoUrl from '../assets/logo.svg';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  light?: boolean;
  customLogoUrl?: string | null;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  light = false,
  customLogoUrl = null
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
    '2xl': 'w-48 h-48'
  };

  const chosenSize = sizeClasses[size];
  const activeLogo = customLogoUrl || defaultLogoUrl;

  return (
    <div className={`relative inline-flex items-center justify-center ${chosenSize} ${className} shrink-0 select-none`}>
      <img
        src={activeLogo}
        alt="كيان العود | Kayan Aloud"
        className={`w-full h-full object-contain drop-shadow-sm rounded-full ${light ? 'brightness-110 contrast-105' : ''}`}
        loading="eager"
      />
    </div>
  );
};
