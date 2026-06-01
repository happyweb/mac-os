import { useState } from 'react';

const participants = [
  { id: '1', name: '张三', video: true },
  { id: '2', name: '李四', video: true },
  { id: '3', name: '王五', video: false },
  { id: '4', name: '赵六', video: true },
];

export const ZoomDemo = () => {
  const [muted, setMuted] = useState(false);
  const [camera, setCamera] = useState(true);
  const [meetingId] = useState('123 456 7890');

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-2 gap-2 p-4">
        {participants.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 rounded-lg flex items-center justify-center relative"
          >
            {p.video ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto mb-2">
                  {p.name.charAt(0)}
                </div>
                <div className="text-white text-sm">{p.name}</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-xl font-semibold mx-auto mb-2">
                  {p.name.charAt(0)}
                </div>
                <div className="text-white text-sm">{p.name}</div>
                <div className="text-gray-400 text-xs">摄像头关闭</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Meeting Info */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="text-gray-400 text-sm">
          会议ID: {meetingId}
        </div>
        <div className="text-gray-400 text-sm">
          00:45:23
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              muted ? 'bg-red-500' : 'bg-gray-600'
            } text-white hover:opacity-80`}
          >
            {muted ? '🔇' : '🎤'}
          </button>
          <button
            onClick={() => setCamera(!camera)}
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              !camera ? 'bg-red-500' : 'bg-gray-600'
            } text-white hover:opacity-80`}
          >
            {camera ? '📹' : '🚫'}
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-600 text-white hover:opacity-80 flex items-center justify-center">
            📋
          </button>
          <button className="w-12 h-12 rounded-full bg-gray-600 text-white hover:opacity-80 flex items-center justify-center">
            😃
          </button>
          <button className="w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center">
            📞
          </button>
        </div>
      </div>
    </div>
  );
};
