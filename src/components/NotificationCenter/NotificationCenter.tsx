import { useStore } from '../../store/useStore';
import { Calendar, StickyNote, Mail } from 'lucide-react';

export const NotificationCenter = () => {
  const { controlPanel, closeControlPanel } = useStore();

  if (controlPanel !== 'notificationCenter') return null;

  const notifications = [
    {
      id: 1,
      icon: Calendar,
      color: '#FF3B30',
      title: '日历',
      message: '下午 3:00 · 团队周会',
      time: '1小时后',
    },
    {
      id: 2,
      icon: Mail,
      color: '#007AFF',
      title: '邮件',
      message: '发件人：客户 - 主题：项目报价',
      time: '2小时前',
    },
    {
      id: 3,
      icon: Calendar,
      color: '#007AFF',
      title: 'Safari',
      message: '更新已下载完成',
      time: '今天',
    },
    {
      id: 4,
      icon: StickyNote,
      color: '#FFCC00',
      title: '备忘录',
      message: '你有 2 条新备忘录',
      time: '今天',
    },
  ];

  return (
    <div className="fixed top-7 right-1 z-[10000]" onClick={(e) => e.stopPropagation()}>
      <div
        className="bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl w-80 shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(255,255,255,0.2)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/20">
          <div className="text-[15px] font-semibold text-white">通知</div>
          <button className="text-[12px] text-white/70 hover:text-white transition-colors">
            清除
          </button>
        </div>

        {/* Notifications */}
        <div className="p-2 space-y-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-white/20 backdrop-blur-xl rounded-xl p-3 hover:bg-white/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: notif.color + '30' }}
                >
                  <notif.icon size={18} style={{ color: notif.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-white">{notif.title}</span>
                    <span className="text-[11px] text-white/50">{notif.time}</span>
                  </div>
                  <p className="text-[12px] text-white/80 mt-0.5 truncate">{notif.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Widgets Section */}
        <div className="px-4 py-3 border-t border-white/20">
          <div className="text-[12px] text-white/50 mb-2">小组件</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3">
              <div className="text-[11px] text-white/70 mb-1">天气</div>
              <div className="text-[20px] text-white font-medium">☀️ 26°</div>
              <div className="text-[10px] text-white/60">北京 · 晴</div>
            </div>
            <div className="bg-white/20 backdrop-blur-xl rounded-xl p-3">
              <div className="text-[11px] text-white/70 mb-1">日历</div>
              <div className="text-[13px] text-white font-medium">下午 3:00</div>
              <div className="text-[10px] text-white/60">团队周会</div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10" onClick={closeControlPanel} />
    </div>
  );
};
