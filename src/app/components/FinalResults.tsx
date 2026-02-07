import { useGame } from '../contexts/GameContext';
import { Button } from './ui/button';

export function FinalResults() {
  const { players } = useGame();
  const sorted = [...players].sort((a, b) => b.points - a.points);
  return (
    <div className="h-full w-full p-6 flex flex-col gap-6 text-slate-900 items-center justify-center">
      <h2 className="text-4xl font-black text-blue-600">最終結果</h2>
      <div className="space-y-4 w-full max-w-md">
        {sorted.map((p, i) => (
          <div key={p.id} className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="font-black text-xl">{i+1}位 {p.name}</span>
            <span className="font-bold text-xl">{p.points.toLocaleString()} pt</span>
          </div>
        ))}
      </div>
      <Button onClick={() => window.location.reload()} className="bg-blue-600 text-white">トップに戻る</Button>
    </div>
  );
}
