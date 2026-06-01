import { useStore } from '../../store/useStore';
import {
  Wifi,
  Bluetooth,
  Airplay,
  Focus,
  Sun,
  Volume2,
  Music,
  SkipBack,
  Play,
  SkipForward,
  Lock,
  Keyboard,
  Battery,
} from 'lucide-react';

export const ControlCenter = () => {
  const { controlPanel, closeControlPanel } = useStore();

  if (controlPanel !== 'controlCenter') return null;

  return (
    <div className="fixed top-7 right-1 z-[10000]" onClick={(e) => e.stopPropagation()}>
      <div
        className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl p-3 w-80 shadow-2xl"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.2)',
        }}
      >
        {/* Top Row - Quick Controls */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {/* WiFi */}
          <button className="bg-blue-500/80 backdrop-blur-xl rounded-xl p-3 flex flex-col items-center hover:bg-blue-500 transition-colors">
            <Wifi size={22} className="text-white" />
            <span className="text-[11px] text-white mt-1.5 font-medium">WiFi</span>
          </button>

          {/* Bluetooth */}
          <button className="bg-blue-500/80 backdrop-blur-xl rounded-xl p-3 flex flex-col items-center hover:bg-blue-500 transition-colors">
            <Bluetooth size={22} className="text-white" />
            <span className="text-[11px] text-white mt-1.5 font-medium">蓝牙</span>
          </button>

          {/* AirPlay */}
          <button className="bg-gray-500/60 backdrop-blur-xl rounded-xl p-3 flex flex-col items-center hover:bg-gray-500/80 transition-colors">
            <Airplay size={22} className="text-white" />
            <span className="text-[11px] text-white mt-1.5 font-medium">隔空播放</span>
          </button>
        </div>

        {/* Second Row - More Controls */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {/* AirDrop */}
          <button className="bg-gray-500/60 backdrop-blur-xl rounded-xl p-3 flex flex-col items-center hover:bg-gray-500/80 transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.43.02-2.56 1.89-4.87 4.46-5.66.29-.09.59-.09.88 0 2.57.79 4.44 3.1 4.46 5.66 0 3.58-3.05 6.94-7 7.43-.28.04-.56.05-.84.05z"/>
            </svg>
            <span className="text-[11px] text-white mt-1.5 font-medium">隔空投送</span>
          </button>

          {/* Focus */}
          <button className="bg-gray-500/60 backdrop-blur-xl rounded-xl p-3 flex flex-col items-center hover:bg-gray-500/80 transition-colors">
            <Focus size={22} className="text-white" />
            <span className="text-[11px] text-white mt-1.5 font-medium">聚焦</span>
          </button>

          {/* Lock */}
          <button className="bg-gray-500/60 backdrop-blur-xl rounded-xl p-3 flex flex-col items-center hover:bg-gray-500/80 transition-colors">
            <Lock size={22} className="text-white" />
            <span className="text-[11px] text-white mt-1.5 font-medium">锁定</span>
          </button>
        </div>

        {/* Slider Section */}
        <div className="space-y-2 mb-3">
          {/* Brightness */}
          <div className="flex items-center gap-3 bg-white/30 backdrop-blur-xl rounded-xl p-2.5">
            <Sun size={18} className="text-white" />
            <input
              type="range"
              className="flex-1 h-1.5 appearance-none cursor-pointer rounded-full"
              style={{
                background: 'linear-gradient(to right, #ffffff 80%, rgba(255,255,255,0.3) 80%)',
              }}
              defaultValue={75}
            />
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 bg-white/30 backdrop-blur-xl rounded-xl p-2.5">
            <Volume2 size={18} className="text-white" />
            <input
              type="range"
              className="flex-1 h-1.5 appearance-none cursor-pointer rounded-full"
              style={{
                background: 'linear-gradient(to right, #ffffff 60%, rgba(255,255,255,0.3) 60%)',
              }}
              defaultValue={60}
            />
          </div>
        </div>

        {/* Now Playing */}
        <div className="bg-white/30 backdrop-blur-xl rounded-xl p-3 flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
            <Music size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] text-white font-medium">正在播放</div>
            <div className="text-[11px] text-white/70">歌曲名称 - 艺术家</div>
          </div>
          <div className="flex gap-1">
            <button className="text-white p-1 hover:bg-white/20 rounded-lg transition-colors">
              <SkipBack size={16} />
            </button>
            <button className="text-white p-1 hover:bg-white/20 rounded-lg transition-colors">
              <Play size={16} fill="white" />
            </button>
            <button className="text-white p-1 hover:bg-white/20 rounded-lg transition-colors">
              <SkipForward size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Row - System Controls */}
        <div className="grid grid-cols-4 gap-2">
          <button className="bg-white/20 backdrop-blur-xl rounded-xl p-2 flex flex-col items-center hover:bg-white/30 transition-colors">
            <Keyboard size={18} className="text-white" />
          </button>
          <button className="bg-white/20 backdrop-blur-xl rounded-xl p-2 flex flex-col items-center hover:bg-white/30 transition-colors">
            <Focus size={18} className="text-white" />
          </button>
          <button className="bg-white/20 backdrop-blur-xl rounded-xl p-2 flex flex-col items-center hover:bg-white/30 transition-colors">
            <Volume2 size={18} className="text-white" />
          </button>
          <button className="bg-white/20 backdrop-blur-xl rounded-xl p-2 flex flex-col items-center hover:bg-white/30 transition-colors">
            <Battery size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={closeControlPanel} />
    </div>
  );
};
