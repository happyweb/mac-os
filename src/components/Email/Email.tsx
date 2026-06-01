import { useState } from 'react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  starred: boolean;
}

const mockEmails: Email[] = [
  { id: '1', from: '系统通知', subject: '您的账户安全提醒', preview: '我们检测到您的账户在新设备上登录...', time: '10:30', read: false, starred: true },
  { id: '2', from: '张三', subject: '项目进度汇报', preview: '本周项目进展顺利，已完成80%...', time: '09:15', read: true, starred: false },
  { id: '3', from: '李四', subject: '周末聚餐邀请', preview: '这周六晚上有空吗?大家一起吃个饭...', time: '昨天', read: true, starred: false },
  { id: '4', from: 'HR', subject: '面试结果通知', preview: '恭喜您通过了面试，请查看附件...', time: '昨天', read: false, starred: true },
  { id: '5', from: '王五', subject: '代码审查请求', preview: '请帮我审查一下这个PR...', time: '周一', read: true, starred: false },
];

export const EmailDemo = () => {
  const [emails, setEmails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [currentFolder, setCurrentFolder] = useState('inbox');

  const toggleStar = (id: string) => {
    setEmails(emails.map(e =>
      e.id === id ? { ...e, starred: !e.starred } : e
    ));
  };

  const folders = [
    { id: 'inbox', name: '收件箱', icon: '📥', count: emails.filter(e => !e.read).length },
    { id: 'starred', name: '星标', icon: '⭐' },
    { id: 'sent', name: '已发送', icon: '📤' },
    { id: 'drafts', name: '草稿', icon: '📝' },
    { id: 'trash', name: '垃圾箱', icon: '🗑️' },
  ];

  return (
    <div className="h-full flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <button className="w-full py-2 bg-blue-500 rounded-lg font-medium hover:bg-blue-600">
            编写邮件
          </button>
        </div>
        <nav className="flex-1 overflow-auto">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setCurrentFolder(folder.id)}
              className={`w-full px-4 py-2 flex items-center justify-between hover:bg-gray-700 ${
                currentFolder === folder.id ? 'bg-gray-700' : ''
              }`}
            >
              <span>{folder.icon} {folder.name}</span>
              {folder.count && folder.count > 0 && (
                <span className="bg-blue-500 text-xs px-2 py-0.5 rounded-full">
                  {folder.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Email List */}
      <div className="w-80 border-r border-gray-300 bg-white flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <input
            type="text"
            placeholder="搜索邮件..."
            className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm"
          />
        </div>
        <div className="flex-1 overflow-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                !email.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-medium ${!email.read ? 'text-blue-600' : 'text-gray-800'}`}>
                  {email.from}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleStar(email.id); }}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    {email.starred ? '⭐' : '☆'}
                  </button>
                  <span className="text-xs text-gray-500">{email.time}</span>
                </div>
              </div>
              <div className={`text-sm truncate ${!email.read ? 'font-medium' : 'text-gray-600'}`}>
                {email.subject}
              </div>
              <div className="text-xs text-gray-400 truncate mt-1">
                {email.preview}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 bg-white flex flex-col">
        {selectedEmail ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">{selectedEmail.subject}</h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <span className="font-medium">{selectedEmail.from}</span>
                <span>&lt;example@email.com&gt;</span>
                <span className="text-gray-400">{selectedEmail.time}</span>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <p className="text-gray-700 leading-relaxed">
                {selectedEmail.preview}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                您好，<br/><br/>
                这是一封演示邮件。邮件内容显示了邮件查看界面的基本功能。
                <br/><br/>
                谢谢！
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                回复
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
                转发
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">
                删除
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            选择一封邮件查看内容
          </div>
        )}
      </div>
    </div>
  );
};
