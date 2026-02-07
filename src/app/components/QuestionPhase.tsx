import { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { Button } from './ui/button';

export function QuestionPhase() {
  const { setPhase } = useGame();
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-6 text-slate-900 p-4">
      <h2 className="text-2xl font-black text-blue-600">質問タイム</h2>
      <div className="text-6xl font-black">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
      <p className="text-slate-400">投資家はカンパニーに自由に質問してください。</p>
      <Button onClick={() => setPhase('investment')} className="bg-slate-900 text-white px-10">投資判断へ</Button>
    </div>
  );
}
