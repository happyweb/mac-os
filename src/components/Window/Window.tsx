import { useState, useRef, useEffect } from 'react';
import { WindowState } from '../../types';
import { useStore } from '../../store/useStore';
import { Browser } from '../Browser/Browser';
import { VSCodeDemo } from '../VSCode/VSCode';
import { WordDemo } from '../Word/Word';
import { FacebookDemo } from '../Facebook/Facebook';
import { FinderDemo } from '../Finder/Finder';
import { AppStoreDemo } from '../AppStore/AppStore';
import { ExcelDemo } from '../Excel/Excel';
import { XmindDemo } from '../Xmind/Xmind';
import { PostmanDemo } from '../Postman/Postman';
import { ZoomDemo } from '../Zoom/Zoom';
import { EmailDemo } from '../Email/Email';
import { DockerDemo } from '../Docker/Docker';

interface WindowProps {
  window: WindowState;
  children?: React.ReactNode;
}

export const Window = ({ window, children }: WindowProps) => {
  const { closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize, focusWindow } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    if (window.isMaximized) return;

    setIsDragging(true);
    focusWindow(window.id);
    dragOffset.current = {
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    };
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    focusWindow(window.id);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateWindowPosition(window.id, {
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
      if (isResizing && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        updateWindowSize(window.id, {
          width: Math.max(400, e.clientX - rect.left),
          height: Math.max(300, e.clientY - rect.top),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, window.id]);

  if (window.isMinimized) return null;

  const style = window.isMaximized
    ? { left: 0, top: 28, width: '100%', height: 'calc(100vh - 28px - 80px)' }
    : {
        left: window.position.x,
        top: window.position.y + 28,
        width: window.size.width,
        height: window.size.height,
      };

  return (
    <div
      ref={windowRef}
      className="absolute bg-white/90 backdrop-blur-xl rounded-xl border border-white/30 shadow-2xl overflow-hidden"
      style={{ ...style, zIndex: window.zIndex }}
      onMouseDown={() => focusWindow(window.id)}
    >
      {/* Title Bar */}
      <div
        className="h-8 bg-gray-100/80 flex items-center px-3 cursor-default select-none"
        onMouseDown={handleMouseDown}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-2 window-controls">
          <button
            onClick={() => closeWindow(window.id)}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
          />
          <button
            onClick={() => minimizeWindow(window.id)}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
          />
          <button
            onClick={() => maximizeWindow(window.id)}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
          />
        </div>

        {/* Title */}
        <div className="flex-1 text-center text-sm text-gray-700 font-medium">
          {window.title}
        </div>
      </div>

      {/* Content */}
      <div className={`h-[calc(100%-2rem)] overflow-auto ${['finder', 'launchpad', 'reminders', 'notes', 'calendar', 'photos', 'settings'].includes(window.appId) ? '' : 'bg-white'}`}>
        {children || (window.appId === 'safari' || window.appId === 'mail' ? (
          <Browser defaultUrl={window.url || 'https://www.google.com'} />
        ) : window.appId === 'finder' ? (
          <FinderDemo />
        ) : window.appId === 'launchpad' ? (
          <AppStoreDemo />
        ) : (window.appId === 'reminders' || window.appId === 'notes' || window.appId === 'calendar') ? (
          <VSCodeDemo />
        ) : window.appId === 'photos' ? (
          <WordDemo />
        ) : window.appId === 'settings' ? (
          <FacebookDemo />
        ) : window.appId === 'excel' ? (
          <ExcelDemo />
        ) : window.appId === 'xmind' ? (
          <XmindDemo />
        ) : window.appId === 'postman' ? (
          <PostmanDemo />
        ) : window.appId === 'zoom' ? (
          <ZoomDemo />
        ) : window.appId === 'email' ? (
          <EmailDemo />
        ) : window.appId === 'docker' ? (
          <DockerDemo />
        ) : (
          <div className="p-8 text-center text-gray-500">
            {window.title}
          </div>
        ))}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z"/>
          </svg>
        </div>
      )}
    </div>
  );
};
