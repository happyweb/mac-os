import React from 'react';
import { MacOSIcon } from '../MacOSIcon';

interface LaunchPadIconProps {
  label: string;
  iconKey: string;
  onClick: () => void;
}

export const LaunchPadIcon: React.FC<LaunchPadIconProps> = ({
  label,
  iconKey,
  onClick,
}) => {
  return (
    <button
      className="flex flex-col items-center gap-2 group cursor-pointer"
      onClick={onClick}
    >
      <div
        className="transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-2"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))',
        }}
      >
        <MacOSIcon name={iconKey} size={72} useImage={true} />
      </div>
      <span className="text-white text-[12px] font-medium text-shadow text-center w-full truncate px-1">
        {label}
      </span>
    </button>
  );
};