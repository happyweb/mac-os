import { useState } from 'react';
import { Folder, Download, Monitor } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DesktopIconProps {
  id: string;
  icon: string;
  name: string;
  position: { x: number; y: number };
  isDragging: boolean;
  onDoubleClick: () => void;
  onDragStart: (id: string, clientX: number, clientY: number) => void;
}

const iconComponents: Record<string, React.FC<LucideProps>> = {
  Folder,
  Download,
  Monitor,
};

export const DesktopIcon = ({ id, icon, name, position, isDragging, onDoubleClick, onDragStart }: DesktopIconProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const IconComponent = iconComponents[icon];
  const useImageIcon = icon === 'Documents';

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setIsSelected(true);
    onDragStart(id, e.clientX, e.clientY);
  };

  return (
    <div
      className={`
        absolute flex flex-col items-center p-1 rounded-lg cursor-pointer transition-all duration-75 w-22 select-none
        ${isDragging ? 'opacity-80 z-50' : 'z-10'}
        ${isSelected && !isDragging ? 'bg-white/30 ring-2 ring-white/50' : 'hover:bg-white/20'}
      `}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation();
        setIsSelected(true);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
    >
      {useImageIcon ? (
        <img
          src={`/images/${icon}.png`}
          alt={name}
          className="w-10 h-10 mb-1 pointer-events-none"
          style={{ objectFit: 'contain' }}
        />
      ) : IconComponent ? (
        <IconComponent size={40} className="text-white mb-1 drop-shadow-lg pointer-events-none" />
      ) : (
        <Folder size={40} className="text-white mb-1 drop-shadow-lg pointer-events-none" />
      )}
      <span className="text-[10px] text-white text-center drop-shadow-md font-medium px-1 py-0.5 rounded bg-black/20 pointer-events-none">
        {name}
      </span>
    </div>
  );
};
