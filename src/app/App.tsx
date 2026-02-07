import { useState, useEffect } from 'react';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { StartScreen } from './components/StartScreen';
import { RulesScreen } from './components/RulesScreen';
import { GameSetup } from './components/GameSetup';
import { GamePlay } from './components/GamePlay';
import { GameProvider } from './contexts/GameContext';

export default function App() {
  const [appState, setAppState] = useState<'start' | 'rules' | 'setup' | 'playing'>('start');

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lock({ orientation: 'landscape' });
      } catch (err) {
        console.log('Orientation lock not supported on this platform:', err);
      }
    };
    lockOrientation();
  }, []);

  return (
    <GameProvider>
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center overflow-hidden select-none text-slate-900">
        <div className="w-full h-full max-w-[812px] max-h-[375px] aspect-[812/375] bg-white relative overflow-hidden shadow-2xl md:rounded-[32px] flex flex-col transition-all duration-300">
          {appState === 'start' && (
            <StartScreen 
              onStart={() => setAppState('setup')}
              onShowRules={() => setAppState('rules')}
            />
          )}
          {appState === 'rules' && (
            <RulesScreen onClose={() => setAppState('start')} />
          )}
          {appState === 'setup' && (
            <GameSetup onStart={() => setAppState('playing')} />
          )}
          {appState === 'playing' && (
            <GamePlay />
          )}
        </div>
      </div>
    </GameProvider>
  );
}
