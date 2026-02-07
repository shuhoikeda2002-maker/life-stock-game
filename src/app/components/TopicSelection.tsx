import { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sparkles } from 'lucide-react';

const DEFAULT_TOPICS = ['人生の幸福度', '人生の充実度', '夢や希望の大きさ', '生きるエネルギー量'];

export function TopicSelection() {
  const { players, currentRound, updateRound, setPhase, getCurrentRound } = useGame();
  const [customTopic, setCustomTopic] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const round = getCurrentRound();
  const company = players.find(p => p.id === round?.companyId);

  const handleConfirmTopic = () => {
    const finalTopic = customTopic.trim() !== '' ? customTopic.trim() : selectedTopic;
    if (!finalTopic) return;
    updateRound(currentRound, { topic: finalTopic });
    setPhase('graph-creation');
  };

  return (
    <div className="h-full w-full p-4 flex flex-col gap-3 overflow-hidden text-slate-900">
      <h2 className="text-xl font-black text-blue-600 text-center">お題の決定</h2>
      <div className="flex gap-4 flex-1 items-center justify-center">
        <div className="w-[280px] flex flex-col gap-3">
          <Input placeholder="カスタムお題..." value={customTopic} onChange={(e) => setCustomTopic(e.target.value)} />
          <Button onClick={handleConfirmTopic}>決定</Button>
        </div>
        <div className="flex-1 max-w-[360px] flex flex-col gap-3">
          <Button onClick={() => setSelectedTopic(DEFAULT_TOPICS[Math.floor(Math.random() * DEFAULT_TOPICS.length)])}>ランダム</Button>
          <div className="text-center font-black text-xl">{selectedTopic}</div>
        </div>
      </div>
    </div>
  );
}
