import { useGame } from '../contexts/GameContext';

export function GameHeader() {
  const { players, currentRound, phase } = useGame();
  const getPhaseTitle = () => {
    switch (phase) {
      case 'topic-selection': return 'お題選択';
      case 'graph-creation': return 'グラフ作成';
      case 'questions': return '質問タイム';
      case 'investment': return '投資判断';
      case 'results-reveal': return '結果発表';
      case 'results': return 'ラウンド結果';
      case 'final-results': return '最終結果';
      default: return 'ライフストック';
    }
  };

  return (
    <div className="h-10 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-black text-blue-600">LIFE STOCK</h1>
        <div className="h-3 w-px bg-slate-200"></div>
        <div className="text-[10px] font-bold text-slate-400">ラウンド {currentRound} / {players.length}</div>
      </div>
      <div className="text-[10px] font-black text-slate-500 tracking-[0.2em]">{getPhaseTitle()}</div>
    </div>
  );
}
