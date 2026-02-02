import React from 'react';
import { Box } from '@mui/material';

interface LogoProps {
  size?: number;
  variant?: 'full' | 'icon';
}

const Logo: React.FC<LogoProps> = ({ size = 120, variant = 'full' }) => {
  if (variant === 'icon') {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Círculo de fundo com gradiente */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1976d2" />
              <stop offset="100%" stopColor="#42a5f5" />
            </linearGradient>
            <linearGradient id="crossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e3f2fd" />
            </linearGradient>
          </defs>

          {/* Círculo de fundo */}
          <circle cx="100" cy="100" r="95" fill="url(#logoGradient)" />
          
          {/* Cruz médica estilizada */}
          <path
            d="M 100 40 L 100 160 M 40 100 L 160 100"
            stroke="url(#crossGradient)"
            strokeWidth="28"
            strokeLinecap="round"
          />
          
          {/* Pulso cardíaco */}
          <path
            d="M 50 100 L 70 100 L 80 80 L 90 120 L 100 100 L 110 100 L 120 60 L 130 100 L 150 100"
            stroke="#4caf50"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Círculo de fundo com gradiente */}
        <defs>
          <linearGradient id="logoGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1976d2" />
            <stop offset="100%" stopColor="#42a5f5" />
          </linearGradient>
          <linearGradient id="crossGradientFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e3f2fd" />
          </linearGradient>
        </defs>

        {/* Círculo de fundo */}
        <circle cx="100" cy="100" r="95" fill="url(#logoGradientFull)" />
        
        {/* Cruz médica estilizada */}
        <path
          d="M 100 40 L 100 160 M 40 100 L 160 100"
          stroke="url(#crossGradientFull)"
          strokeWidth="28"
          strokeLinecap="round"
        />
        
        {/* Pulso cardíaco */}
        <path
          d="M 50 100 L 70 100 L 80 80 L 90 120 L 100 100 L 110 100 L 120 60 L 130 100 L 150 100"
          stroke="#4caf50"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export default Logo;