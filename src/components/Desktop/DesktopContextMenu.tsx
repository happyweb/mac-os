import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface MenuItem {
  label: string;
  action?: () => void;
  submenu?: MenuItem[];
  divider?: boolean;
  disabled?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onChangeWallpaper: () => void;
  onNewFolder: (position: { x: number; y: number }) => void;
}

export const DesktopContextMenu = ({ x, y, onClose, onChangeWallpaper, onNewFolder }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('name');

  const menuItems: MenuItem[] = [
    {
      label: '排序方式',
      submenu: [
        { label: '名称', action: () => setSortBy('name') },
        { label: '日期修改', action: () => setSortBy('dateModified') },
        { label: '日期创建', action: () => setSortBy('dateCreated') },
        { label: '大小', action: () => setSortBy('size') },
        { label: '种类', action: () => setSortBy('kind') },
      ],
    },
    {
      label: '整理',
      submenu: [
        { label: '按名称整理', action: () => {} },
        { label: '按大小整理', action: () => {} },
        { label: '按日期整理', action: () => {} },
      ],
    },
    {
      label: '使用叠放',
      action: () => {},
    },
    {
      label: '查看显示选项',
      action: () => {},
      divider: true,
    },
    {
      label: '新建文件夹',
      action: () => onNewFolder({ x, y }),
    },
    {
      label: '新建智能文件夹',
      action: () => {},
      divider: true,
    },
    // {
    //   label: '获取信息',
    //   action: () => {},
    //   divider: true,
    // },
    {
      label: 'AirDrop',
      submenu: [
        { label: '允许我被发现：所有人' },
        { label: '仅联系人' },
        { label: '关闭' },
        { label: '─────────', divider: true },
        { label: '隔空投送设置...' },
      ],
    },
    {
      label: '服务',
      submenu: [
        { label: '查找' },
        { label: '快速备忘录' },
        { label: '添加到提醒事项' },
        { label: '压缩...' },
      ],
      divider: true,
    },
    {
      label: '改变桌面背景...',
      action: onChangeWallpaper,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Adjust position if menu would go off screen
  const [adjustedX, adjustedY] = getAdjustedPosition(x, y, menuRef);

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.divider) {
      return <div key={index} className="h-px bg-gray-300/50 my-1" />;
    }

    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenu === item.label;

    return (
      <div key={index}>
        <button
          className={`
            w-full px-3 py-1.5 text-left text-sm flex items-center justify-between
            hover:bg-blue-500 hover:text-white rounded-md mx-1 my-0.5
            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={() => {
            if (item.disabled) return;
            if (hasSubmenu) {
              setOpenSubmenu(isSubmenuOpen ? null : item.label);
            } else if (item.action) {
              item.action();
              onClose();
            }
          }}
          onMouseEnter={() => hasSubmenu && setOpenSubmenu(item.label)}
        >
          <span>{item.label}</span>
          {hasSubmenu && <span className="ml-2 text-xs">▶</span>}
        </button>

        {hasSubmenu && isSubmenuOpen && (
          <div
            className="absolute left-full top-0 ml-1"
            style={{
              minWidth: '180px',
            }}
          >
            <div
              className="bg-gray-100/95 backdrop-blur-xl border border-gray-300/50 rounded-lg py-1 shadow-xl"
              style={{
                boxShadow: '0 12px 40px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.1)',
              }}
            >
              {item.submenu!.map((subItem, subIndex) => (
                <div key={subIndex}>
                  {subItem.divider ? (
                    <div className="h-px bg-gray-300/50 my-1 mx-2" />
                  ) : (
                    <button
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white rounded-md mx-1 my-0.5"
                      onClick={() => {
                        if (subItem.action) {
                          subItem.action();
                        }
                        onClose();
                      }}
                    >
                      {subItem.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return createPortal(
    <div
      ref={menuRef}
      className="fixed z-[10000]"
      style={{
        left: adjustedX,
        top: adjustedY,
      }}
    >
      <div
        className="bg-gray-100/95 backdrop-blur-xl border border-gray-300/50 rounded-xl py-1 min-w-[200px]"
        style={{
          boxShadow: '0 12px 40px rgba(0,0,0,0.25), 0 0 0 0.5px rgba(0,0,0,0.1)',
        }}
      >
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </div>
    </div>,
    document.body
  );
};

function getAdjustedPosition(
  x: number,
  y: number,
  menuRef: React.RefObject<HTMLDivElement>
): [number, number] {
  if (typeof window === 'undefined') return [x, y];

  const menuWidth = 220;
  const menuHeight = 400;
  const padding = 10;

  let adjustedX = x;
  let adjustedY = y;

  if (x + menuWidth + padding > window.innerWidth) {
    adjustedX = window.innerWidth - menuWidth - padding;
  }

  if (y + menuHeight + padding > window.innerHeight) {
    adjustedY = window.innerHeight - menuHeight - padding;
  }

  return [adjustedX, adjustedY];
}
