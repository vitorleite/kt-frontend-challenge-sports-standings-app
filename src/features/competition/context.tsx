import { createContext, use } from 'react';
import type { CompetitionContextValue } from './types';

export const CompetitionContext = createContext<CompetitionContextValue | null>(null);

export const useCompetitionContext = () => {
  const context = use(CompetitionContext);
  if (!context) {
    throw new Error('Competition components must be used within a Competition.Provider');
  }
  return context;
};
