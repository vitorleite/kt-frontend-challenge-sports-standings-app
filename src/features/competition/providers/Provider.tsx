import { useEffect, useState } from 'react';
import { CompetitionContext } from '../context';
import type {
  CompetitionConfig,
  CompetitionState,
  CompetitionParticipant,
  CompetitionResult,
  CompetitionActions
} from '../types';

export interface CompetitionProps {
  children: React.ReactNode;
  config: CompetitionConfig;
  initialState?: CompetitionState;
  onStateChange?: (state: CompetitionState) => void;
}

const defaultConfig: Required<Omit<CompetitionConfig, 'title'>> = {
  matchFormat: 'singleRoundRobin',
  pointsSystem: {
    win: 3,
    draw: 1,
    loss: 0
  },
  addParticipantLabels: {
    participantName: 'Team Name'
  },
  addResultLabels: {
    homeParticipant: 'Home Team',
    homeResult: 'Home Score',
    awayParticipant: 'Away Team',
    awayResult: 'Away Score'
  },
  standingsColumns: [
    { label: 'P', key: 'played' },
    { label: 'W', key: 'won' },
    { label: 'D', key: 'drawn' },
    { label: 'L', key: 'lost' }
  ]
};

export function Provider({ children, config, initialState, onStateChange = () => {} }: CompetitionProps) {
  const [participants, setParticipants] = useState<CompetitionParticipant[]>(initialState?.participants || []);
  const [results, setResults] = useState<CompetitionResult[]>(initialState?.results || []);

  useEffect(() => {
    onStateChange({ participants, results });
  }, [participants, results, onStateChange]);

  // We could compose this provider and have specific variants for different
  // competition types/formats/sports in the future
  // Then some methods could be different depending on the format
  const matchFormat = config.matchFormat || defaultConfig.matchFormat;
  const hasPlayedBefore = (participantA: string, participantB: string): boolean => {
    if (matchFormat === 'doubleRoundRobin') {
      return results.some((result) => result.participantA === participantA && result.participantB === participantB);
    }

    return results.some(
      (result) =>
        (result.participantA === participantA && result.participantB === participantB) ||
        (result.participantA === participantB && result.participantB === participantA)
    );
  };

  const actions: CompetitionActions = {
    addParticipant: (participant: CompetitionParticipant) => {
      if (!participant || participant.trim() === '') {
        return { ok: false, error: 'Participant name cannot be empty' };
      }

      if (participants.includes(participant)) {
        return { ok: false, error: 'Participant already exists' };
      }

      setParticipants([...participants, participant]);
      return { ok: true };
    },
    addResult: (result: CompetitionResult) => {
      if (!participants.includes(result.participantA) || !participants.includes(result.participantB)) {
        return { ok: false, error: 'Both participants must be registered' };
      }

      if (result.participantA === result.participantB) {
        return { ok: false, error: 'Cannot add result for same participant' };
      }

      if (isNaN(result.scoreA) || isNaN(result.scoreB)) {
        return { ok: false, error: 'Scores must be valid numbers' };
      }

      if (result.scoreA < 0 || result.scoreB < 0) {
        return { ok: false, error: 'Scores cannot be less than zero' };
      }

      if (hasPlayedBefore(result.participantA, result.participantB)) {
        return { ok: false, error: 'These participants have already played against each other' };
      }

      setResults([...results, result]);
      return { ok: true };
    }
  };

  return (
    <CompetitionContext.Provider
      value={{
        config: { ...defaultConfig, ...config } as Required<CompetitionConfig>,
        actions,
        state: { participants, results }
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
}
