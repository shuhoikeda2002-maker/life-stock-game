import { useGame } from '../contexts/GameContext';
import { Button } from './ui/button';

export function ResultsRevealPhase() {
  const { setPhase } = useGame();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 text-slate-900">
      <h2 className="text-4xl font-black text-blue-600 animate-bounce">結果発表！</h2>
      <Button onClick={() => setPhase('results')} className="bg-slate-900 text-white">次へ</Button>
    </div>
  );
}
