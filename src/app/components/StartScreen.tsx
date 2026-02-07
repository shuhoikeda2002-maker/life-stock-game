import { Button } from './ui/button';
import { TrendingUp, Play, HelpCircle } from 'lucide-react';

export function StartScreen({ onStart, onShowRules }: any) {
  return (
    <div className="h-full w-full bg-white text-slate-900 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <TrendingUp className="size-12 text-blue-600" />
          <h1 className="text-6xl font-black tracking-tighter italic text-blue-600">LIFE STOCK</h1>
        </div>
        <p className="text-lg font-bold text-slate-400">人生の波を読み解く投資ゲーム</p>
        <div className="flex items-center gap-4 mt-4">
          <Button onClick={onStart} className="bg-blue-600 text-white font-black text-xl px-10 h-16 rounded-2xl">ゲーム開始</Button>
          <Button onClick={onShowRules} variant="outline" className="h-16 rounded-2xl">遊び方</Button>
        </div>
      </div>
    </div>
  );
}
