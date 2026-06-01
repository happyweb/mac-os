import React from 'react';

interface TitleBarProps {
  title: string;
  onClose?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
  return (
    <div className="h-8 bg-gray-800/80 backdrop-blur-xl flex items-center px-4 border-b border-white/10 rounded-t-2xl">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer" />
      </div>
      <div className="flex-1 text-center text-sm text-gray-300">{title}</div>
    </div>
  );
};
