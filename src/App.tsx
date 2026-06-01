import { MenuBar } from './components/MenuBar/MenuBar';
import { Desktop } from './components/Desktop/Desktop';
import { Dock } from './components/Dock/Dock';
import { ControlCenter } from './components/ControlCenter/ControlCenter';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import { LaunchPad } from './components/LaunchPad/LaunchPad';
import { WindowManager } from './components/Window/WindowManager';

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Desktop Background */}
      <Desktop />

      {/* System UI - Fixed positions */}
      <MenuBar />
      <Dock />
      <ControlCenter />
      <NotificationCenter />
      <LaunchPad />

      {/* Window Layer */}
      <WindowManager />
    </div>
  );
}

export default App;
