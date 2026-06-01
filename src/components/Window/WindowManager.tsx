import { useStore } from '../../store/useStore';
import { Window } from './Window';

export const WindowManager = () => {
  const { windows } = useStore();

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ top: 28 }}>
      {windows.map((w) => (
        <div key={w.id} className="pointer-events-auto">
          <Window window={w} />
        </div>
      ))}
    </div>
  );
};
