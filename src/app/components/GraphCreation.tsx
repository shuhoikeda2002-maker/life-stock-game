import { useState } from 'react';
import { useGame, AnchorPoint } from '../contexts/GameContext';
import { Button } from './ui/button';
import { LifeGraph } from './LifeGraph';

export function GraphCreation() {
  const { players, getCurrentRound, updateRound, setPhase } = useGame();
  const [anchorPoints, setAnchorPoints] = useState<AnchorPoint[]>([]);
  const [error, setError] = useState('');

  const round = getCurrentRound();
  const company = players.find(p => p.id === round?.companyId);
  const maxAge = company?.age || 100;

  const handlePointClick = (age: number, score: number) => {
    const existingIndex = anchorPoints.findIndex(p => p.age === age);
    if (existingIndex !== -1) {
      if (Math.abs(anchorPoints[existingIndex].score - score) < 5) {
        setAnchorPoints(anchorPoints.filter((_, i) => i !== existingIndex));
      } else {
        const newPoints = [...anchorPoints];
        newPoints[existingIndex] = { age, score };
        setAnchorPoints(newPoints.sort((a, b) => a.age - b.age));
      }
      return;
    }
    if (anchorPoints.length < 10) setAnchorPoints([...anchorPoints, { age, score }].sort((a, b) => a.age - b.age));
    else setError('最大10ポイントまで配置可能です');
  };

  const validateAndSubmit = () => {
    if (anchorPoints.length < 5) { setError('最低5つのポイントを配置してください'); return; }
    if (!round) return;
    updateRound(round.roundNumber, { anchorPoints });
    setPhase('questions');
  };

  return (
    <div className="h-full w-full p-4 flex flex-col gap-3 overflow-hidden text-slate-900">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-blue-600">グラフの作成</h2>
        <div className="bg-slate-100 px-3 py-1 rounded-full text-[10px] font-black tracking-widest border border-slate-200">
          お題: <span className="text-blue-600">{round?.topic}</span>
        </div>
      </div>
      <div className="flex gap-4 flex-1 min-h-0">
        <div className="w-[180px] flex flex-col gap-3">
          <div className="p-4 rounded-xl border-2 bg-slate-50 border-slate-100 flex flex-col items-center">
            <div className="text-3xl font-black">{anchorPoints.length}/10</div>
          </div>
          <Button className="w-full h-10 font-black" onClick={validateAndSubmit} disabled={anchorPoints.length < 5}>作成完了</Button>
          {error && <div className="text-[9px] font-black text-red-600">{error}</div>}
        </div>
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden">
          <LifeGraph anchorPoints={anchorPoints} onPointClick={handlePointClick} interactive maxAge={maxAge} showLabels={true} />
        </div>
      </div>
    </div>
  );
}
