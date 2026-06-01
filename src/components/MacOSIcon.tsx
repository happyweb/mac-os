import React from 'react';

interface MacOSIconProps {
  name: string;
  size?: number;
  className?: string;
  useImage?: boolean;
}

// 纯 CSS 实现的 macOS Sonoma 风格图标
export const MacOSIcon: React.FC<MacOSIconProps> = ({ name, size = 52, className = '', useImage = false }) => {
  const iconSize = size;

  // 如果使用自定义图片
  if (useImage) {
    const webpIcons = ['ex', 'xmind', 'postman', 'zoom', 'email', 'docker'];
    const ext = webpIcons.includes(name) ? 'webp' : 'png';
    return (
      <div
        className={`relative ${className}`}
        style={{ width: iconSize, height: iconSize }}
      >
        <img
          src={`/images/${name}.${ext}`}
          alt={name}
          className="w-full h-full"
          style={{
            borderRadius: '12px',
          }}
        />
      </div>
    );
  }

  const icons: Record<string, { bg: string; fg: string; symbol: React.ReactNode }> = {
    finder: {
      bg: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <ellipse cx="50" cy="45" rx="35" ry="40" fill="white" />
          <ellipse cx="50" cy="45" rx="35" ry="40" fill="url(#finderGrad)" opacity="0.3" />
          <path d="M50 10 L55 35 L50 30 L45 35 Z" fill="white" opacity="0.9" />
          <defs>
            <linearGradient id="finderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5AC8FA" />
              <stop offset="100%" stopColor="#007AFF" />
            </linearGradient>
          </defs>
        </svg>
      ),
    },
    safari: {
      bg: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="6" />
          <polygon points="50,15 85,80 15,80" fill="white" opacity="0.9" />
          <polygon points="50,85 15,20 85,20" fill="#FF375F" opacity="0.9" />
        </svg>
      ),
    },
    mail: {
      bg: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="25" width="80" height="55" rx="5" fill="white" />
          <polyline points="10,30 50,60 90,30" stroke="#007AFF" strokeWidth="4" fill="none" />
        </svg>
      ),
    },
    notes: {
      bg: 'linear-gradient(135deg, #FFCC00 0%, #FF9500 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="20" y="10" width="60" height="80" rx="3" fill="white" />
          <line x1="30" y1="30" x2="70" y2="30" stroke="#FFCC00" strokeWidth="4" />
          <line x1="30" y1="45" x2="70" y2="45" stroke="#FFCC00" strokeWidth="4" />
          <line x1="30" y1="60" x2="55" y2="60" stroke="#FFCC00" strokeWidth="4" />
        </svg>
      ),
    },
    reminders: {
      bg: 'linear-gradient(135deg, #FF9500 0%, #FF3B30 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="6" />
          <circle cx="50" cy="50" r="8" fill="white" />
          <line x1="50" y1="20" x2="50" y2="42" stroke="white" strokeWidth="4" />
        </svg>
      ),
    },
    calendar: {
      bg: 'linear-gradient(135deg, #FF3B30 0%, #FF375F 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="15" y="25" width="70" height="60" rx="5" fill="white" />
          <rect x="15" y="25" width="70" height="18" rx="5" fill="#FF3B30" />
          <rect x="35" y="18" width="8" height="14" rx="3" fill="#8E8E93" />
          <rect x="57" y="18" width="8" height="14" rx="3" fill="#8E8E93" />
        </svg>
      ),
    },
    photos: {
      bg: 'linear-gradient(135deg, #FF375F 0%, #FF3B30 50%, #FFCC00 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="15" y="20" width="70" height="60" rx="5" fill="white" />
          <circle cx="40" cy="45" r="12" fill="#FFCC00" />
          <path d="M15 70 L40 50 L60 65 L85 40 L85 75 L15 75 Z" fill="#FF375F" />
        </svg>
      ),
    },
    music: {
      bg: 'linear-gradient(135deg, #FC3C44 0%, #FF375F 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="32" cy="72" r="18" fill="white" />
          <circle cx="68" cy="65" r="18" fill="white" />
          <rect x="46" y="15" width="6" height="60" fill="white" />
          <rect x="46" y="15" width="24" height="6" fill="white" />
        </svg>
      ),
    },
    terminal: {
      bg: 'linear-gradient(135deg, #30D158 0%, #34C759 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="10" y="20" width="80" height="60" rx="5" fill="white" />
          <polyline points="25,45 40,55 25,65" stroke="#30D158" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="48" y1="65" x2="75" y2="65" stroke="#30D158" strokeWidth="5" strokeLinecap="round" />
        </svg>
      ),
    },
    settings: {
      bg: 'linear-gradient(135deg, #8E8E93 0%, #636366 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="12" fill="none" stroke="white" strokeWidth="8" />
          <path d="M50 10 L55 22 L50 18 L45 22 Z" fill="white" />
          <path d="M50 90 L55 78 L50 82 L45 78 Z" fill="white" />
          <path d="M10 50 L22 45 L18 50 L22 55 Z" fill="white" />
          <path d="M90 50 L78 45 L82 50 L78 55 Z" fill="white" />
          <path d="M21 21 L30 28 L25 30 L21 26 Z" fill="white" />
          <path d="M79 79 L70 72 L75 70 L79 74 Z" fill="white" />
          <path d="M79 21 L70 28 L75 30 L79 26 Z" fill="white" />
          <path d="M21 79 L30 72 L25 70 L21 74 Z" fill="white" />
        </svg>
      ),
    },
    appstore: {
      bg: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="white" strokeWidth="5" />
          <polygon points="50,25 75,37 75,63 50,75 25,63 25,37" fill="white" />
        </svg>
      ),
    },
    rocket: {
      bg: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)',
      fg: '#FFFFFF',
      symbol: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <ellipse cx="50" cy="45" rx="25" ry="35" fill="white" />
          <circle cx="50" cy="40" r="10" fill="#5AC8FA" />
          <path d="M25 65 L15 85 L35 75 Z" fill="white" opacity="0.8" />
          <path d="M75 65 L85 85 L65 75 Z" fill="white" opacity="0.8" />
          <path d="M35 80 L50 95 L65 80 L50 70 Z" fill="#FF375F" />
        </svg>
      ),
    },
  };

  const icon = icons[name] || icons.finder;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: iconSize, height: iconSize }}
    >
      <div
        className="absolute inset-0 rounded-2xl shadow-lg"
        style={{
          background: icon.bg,
          boxShadow: '0 4px 12px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.15)',
        }}
      />
      <div className="absolute inset-0 rounded-2xl flex items-center justify-center p-2">
        {icon.symbol}
      </div>
    </div>
  );
};
