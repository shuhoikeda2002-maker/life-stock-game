import { Button } from './ui/button';
import { X } from 'lucide-react';

export function RulesScreen({ onClose }: any) {
  return (
    <div className="h-full w-full bg-white p-6 flex flex-col text-slate-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-black text-slate-900">遊び方ガイド</h2>
        <Button onClick={onClose} variant="ghost" size="icon"><X className="size-5" /></Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 text-sm">
        <p>1. お題決定：人生の幸福度などのお題を決めます。</p>
        <p>2. グラフ作成：カンパニーがグラフを作ります。</p>
        <p>3. 質問タイム：投資家が質問します。</p>
        <p>4. 投資判断：投資家が売り買いのタイミングを決めます。</p>
        <Button onClick={onClose} className="w-full bg-blue-600 text-white">了解！</Button>
      </div>
    </div>
  );
}
