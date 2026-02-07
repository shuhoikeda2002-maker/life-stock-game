import { useGame } from '../contexts/GameContext';
import { Button } from './ui/button';

export function ResultsPhase() {
  const { setPhase } = useGame();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 text-slate-900 p-6">
      <h2 className="text-2xl font-black text-blue-600">ラウンド結果</h2>
      <div className="bg-slate-50 p-6 rounded-2xl w-full max-w-md text-center">
        <p className="text-xl font-bold">全員の投資結果が集計されました</p>
      </div>
      <Button onClick={() => setPhase('final-results')} className="bg-slate-900 text-white">最終結果へ</Button>
    </div>
  );
}
