import { useState } from 'react';
import { CompetitionContext } from '../context';
import type {
  CompetitionConfig,
  CompetitionState,
  CompetitionParticipant,
  CompetitionResult,
  CompetitionActions
} from '../types';

interface CompetitionProps {
  children: React.ReactNode;
  config: CompetitionConfig;
  initialState?: CompetitionState;
}

export const Provider = ({ children, config, initialState }: CompetitionProps) => {
  const [participants, setParticipants] = useState<CompetitionParticipant[]>(initialState?.participants || []);
  const [results, setResults] = useState<CompetitionResult[]>(initialState?.results || []);

  const actions: CompetitionActions = {
    addParticipant: (participant: CompetitionParticipant) => {
      if (!participants.includes(participant)) {
        setParticipants([...participants, participant]);
      }
    },
    addResult: (result: CompetitionResult) => {
      // TODO: validation
      setResults([...results, result]);
    }
  };

  return (
    <CompetitionContext.Provider
      value={{
        config,
        actions,
        state: { participants, results }
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
};
