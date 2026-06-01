import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { DesktopIcon } from './DesktopIcon';
import { DesktopContextMenu } from './DesktopContextMenu';

interface DesktopItem {
  id: string;
  icon: string;
  name: string;
  position: { x: number; y: number };
}

export const Desktop = () => {
  const { launchApp } = useStore();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([
    { id: 'documents', icon: 'Documents', name: 'Documents', position: { x: 20, y: 80 } },
  ]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    itemStartX: number;
    itemStartY: number;
  } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleChangeWallpaper = () => {
    launchApp('settings');
  };

  const handleNewFolder = (position: { x: number; y: number }) => {
    // Find existing Documents folders to determine the next number
    const existingNames = new Set(desktopItems.map(item => item.name));
    let newName = 'Documents';
    let counter = 1;

    while (existingNames.has(newName)) {
      newName = `Documents ${counter}`;
      counter++;
    }

    const newFolder: DesktopItem = {
      id: `folder-${Date.now()}`,
      icon: 'Documents',
      name: newName,
      position,
    };
    setDesktopItems([newFolder, ...desktopItems]);
    setContextMenu(null);
  };

  const handleDragStart = (id: string, clientX: number, clientY: number) => {
    const item = desktopItems.find(i => i.id === id);
    if (item) {
      dragRef.current = {
        id,
        startX: clientX,
        startY: clientY,
        itemStartX: item.position.x,
        itemStartY: item.position.y,
      };
      setDraggingId(id);
      setDragPos({ x: item.position.x, y: item.position.y });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const drag = dragRef.current;
      if (!drag) return;

      const newX = drag.itemStartX + (e.clientX - drag.startX);
      const newY = drag.itemStartY + (e.clientY - drag.startY);
      setDragPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      const drag = dragRef.current;
      if (drag && dragPos) {
        setDesktopItems(items =>
          items.map(item =>
            item.id === drag.id
              ? { ...item, position: dragPos }
              : item
          )
        );
      }
      dragRef.current = null;
      setDraggingId(null);
      setDragPos(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragPos]);

  const getItemPosition = (item: DesktopItem) => {
    if (draggingId === item.id && dragPos) {
      return dragPos;
    }
    return item.position;
  };

  return (
    <div
      className="fixed inset-0 pt-7 pb-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #0a84ff 0%, #5e5ce6 25%, #bf5af2 50%, #ff375f 75%, #ff9f0a 100%)',
        backgroundImage: 'url(/images/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onContextMenu={handleContextMenu}
    >
      {desktopItems.map((item) => (
        <DesktopIcon
          key={item.id}
          id={item.id}
          icon={item.icon}
          name={item.name}
          position={getItemPosition(item)}
          isDragging={draggingId === item.id}
          onDoubleClick={() => launchApp('finder')}
          onDragStart={handleDragStart}
        />
      ))}

      {contextMenu && (
        <DesktopContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={handleCloseContextMenu}
          onChangeWallpaper={handleChangeWallpaper}
          onNewFolder={handleNewFolder}
        />
      )}
    </div>
  );
};
