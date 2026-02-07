import { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function InvestmentPhase() {
  const { players, currentRound, updateRound, setPhase, getCurrentRound } = useGame();
  const [buyAge, setBuyAge] = useState('');
  const [sellAge, setSellAge] = useState('');
  const [points, setPoints] = useState('1000');

  const handleSubmit = () => {
    const round = getCurrentRound();
    if (!round) return;
    updateRound(currentRound, {
      investments: [{ investorId: 'investor-1', buyAge: parseInt(buyAge), sellAge: parseInt(sellAge), investmentPoints: parseInt(points) }]
    });
    setPhase('results-reveal');
  };

  return (
    <div className="h-full w-full p-6 flex flex-col gap-4 text-slate-900">
      <h2 className="text-2xl font-black text-blue-600 text-center">投資判断</h2>
      <div className="grid grid-cols-3 gap-4">
        <Input placeholder="買い年齢" value={buyAge} onChange={e => setBuyAge(e.target.value)} />
        <Input placeholder="売り年齢" value={sellAge} onChange={e => setSellAge(e.target.value)} />
        <Input placeholder="投資ポイント" value={points} onChange={e => setPoints(e.target.value)} />
      </div>
      <Button onClick={handleSubmit} className="h-16 bg-blue-600 text-white font-black text-xl">投資確定</Button>
    </div>
  );
}
