import React, { createContext, useContext, useState, ReactNode } from 'react';

export const PLAYER_COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export interface Player { id: string; name: string; age: number; points: number; color: string; }
export interface AnchorPoint { age: number; score: number; }
export interface Question { investorId: string; investorName: string; question: string; answer?: string; }
export interface Investment { investorId: string; buyAge: number; sellAge: number; investmentPoints: number; buyScore?: number; sellScore?: number; pointsGained?: number; }
export interface Round { roundNumber: number; companyId: string; topic: string; anchorPoints: AnchorPoint[]; questions: Question[]; investments: Investment[]; completed: boolean; }

interface GameContextType {
  players: Player[]; setPlayers: (players: Player[]) => void;
  currentRound: number; rounds: Round[]; addRound: (round: Round) => void;
  updateRound: (roundNumber: number, updates: Partial<Round>) => void;
  updatePlayerPoints: (playerId: string, points: number) => void;
  getCurrentRound: () => Round | undefined;
  phase: 'setup' | 'topic-selection' | 'graph-creation' | 'questions' | 'investment' | 'results-reveal' | 'results' | 'round-summary' | 'final-results';
  setPhase: (phase: GameContextType['phase']) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [phase, setPhase] = useState<GameContextType['phase']>('setup');

  const addRound = (round: Round) => { setRounds(prev => [...prev, round]); setCurrentRound(round.roundNumber); };
  const updateRound = (roundNumber: number, updates: Partial<Round>) => { setRounds(prev => prev.map(r => r.roundNumber === roundNumber ? { ...r, ...updates } : r)); };
  const updatePlayerPoints = (playerId: string, points: number) => { setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, points: p.points + points } : p)); };
  const getCurrentRound = () => rounds.find(r => r.roundNumber === currentRound);

  return (
    <GameContext.Provider value={{ players, setPlayers, currentRound, rounds, addRound, updateRound, updatePlayerPoints, getCurrentRound, phase, setPhase }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
