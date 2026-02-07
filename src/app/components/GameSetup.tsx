import { useState } from 'react';
import { useGame, PLAYER_COLORS } from '../contexts/GameContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function GameSetup({ onStart }: any) {
  const { setPlayers, setPhase } = useGame();
  const [playerNames, setPlayerNames] = useState(['', '']);
  const [playerAges, setPlayerAges] = useState(['20', '25']);

  const startGame = () => {
    const players = playerNames.filter(n => n).map((name, i) => ({
      id: `player-${i}`, name, age: parseInt(playerAges[i]), points: 10000, color: PLAYER_COLORS[i % PLAYER_COLORS.length]
    }));
    if (players.length < 2) return;
    setPlayers(players); setPhase('topic-selection'); onStart();
  };

  return (
    <div className="h-full w-full p-6 flex flex-col gap-4 text-slate-900">
      <h2 className="text-2xl font-black text-blue-600 text-center">プレイヤー登録</h2>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {playerNames.map((n, i) => (
          <div key={i} className="flex gap-2">
            <Input placeholder="名前" value={n} onChange={(e) => { const next = [...playerNames]; next[i] = e.target.value; setPlayerNames(next); }} />
            <Input placeholder="年齢" value={playerAges[i]} onChange={(e) => { const next = [...playerAges]; next[i] = e.target.value; setPlayerAges(next); }} />
          </div>
        ))}
        <Button variant="outline" onClick={() => { setPlayerNames([...playerNames, '']); setPlayerAges([...playerAges, '']); }}>追加</Button>
      </div>
      <Button onClick={startGame} className="h-16 bg-blue-600 text-white text-xl font-black">開始</Button>
    </div>
  );
}
