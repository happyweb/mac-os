import { useState } from 'react';

export const FacebookDemo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="pt-40 bg-[#f0f2f5] flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-6 text-center">
        <h1 className="text-5xl font-bold text-[#1877f2] mb-2">facebook</h1>
        <p className="text-xl text-gray-600">连接你我，共享世界</p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-5">
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] text-base"
            placeholder="电子邮箱或手机号码"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1877f2] text-base"
            placeholder="密码"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-bold text-base text-white transition-colors ${
              isLoading ? 'bg-[#1877f2]/70' : 'bg-[#1877f2] hover:bg-[#166fe5]'
            }`}
          >
            {isLoading ? '登录中...' : '登录'}
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="#" className="text-[#1877f2] hover:underline text-sm">
            忘记密码？
          </a>
        </div>

        <div className="mt-4 border-t border-gray-200" />

        <div className="mt-4">
          <button className="w-full py-2 bg-[#42b72a] hover:bg-[#36a420] text-white font-bold rounded-lg transition-colors text-base">
            创建新账户
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
        <div className="flex flex-wrap justify-center gap-2">
          <a href="#" className="hover:underline">关于</a>
          <span>·</span>
          <a href="#" className="hover:underline">帮助</a>
          <span>·</span>
          <a href="#" className="hover:underline">登录中心</a>
          <span>·</span>
          <a href="#" className="hover:underline">隐私权政策</a>
          <span>·</span>
          <a href="#" className="hover:underline">使用条款</a>
        </div>
        <p className="mt-2">Meta © 2024</p>
      </div>
    </div>
  );
};
