import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { LaunchPadIcon } from './LaunchPadIcon';

const dockItems = [
  { id: 'finder', name: '访达', icon: '1' },
  { id: 'launchpad', name: 'App Store', icon: '2' },
  { id: 'safari', name: 'Safari', icon: '3' },
  { id: 'mail', name: 'Google Chrome', icon: '4' },
  { id: 'notes', name: 'Xcode', icon: '5' },
  { id: 'reminders', name: 'Visual Studio Code', icon: '6' },
  { id: 'calendar', name: 'Web Storm', icon: '7' },
  { id: 'photos', name: 'Microsoft Word', icon: '8' },
  { id: 'settings', name: 'Facebook', icon: '9' },
  { id: 'excel', name: 'Microsoft Excel', icon: 'ex' },
  { id: 'xmind', name: 'Xmind', icon: 'xmind' },
  { id: 'postman', name: 'Postman', icon: 'postman' },
  { id: 'zoom', name: 'Zoom', icon: 'zoom' },
  { id: 'email', name: 'Email', icon: 'email' },
  { id: 'docker', name: 'Docker', icon: 'docker' },
];

export const LaunchPad = () => {
  const { controlPanel, closeLaunchPad, launchApp } = useStore();

  useEffect(() => {
    if (controlPanel !== 'launchPad') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLaunchPad();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controlPanel, closeLaunchPad]);

  if (controlPanel !== 'launchPad') return null;

  const handleAppClick = (appId: string) => {
    launchApp(appId);
    closeLaunchPad();
  };

  return (
    <div
      className="fixed inset-0 z-[9990] bg-black/30 backdrop-blur-sm flex items-center justify-center"
      onClick={closeLaunchPad}
    >
      <div
        className="bg-white/20 backdrop-blur-xl rounded-3xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-5 gap-6">
          {dockItems.map((app) => (
            <LaunchPadIcon
              key={app.id}
              label={app.name}
              iconKey={app.icon}
              onClick={() => handleAppClick(app.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
