import { Column, Card } from '@/components/ui';
import { Competition } from '@/features/competition';

import styles from './PremierLeague.module.css';
import { useLocalStoragePersistence } from '@/hooks/useLocalStoragePersistence';
import type { CompetitionState } from '@/features/competition/types';

export function PremierLeague() {
  const { handleChange, state } = useLocalStoragePersistence<CompetitionState>('premier-league');

  return (
    <div className={`app ${styles.premierLeague}`}>
      <Competition.Provider
        config={{ title: 'Premier League', matchFormat: 'doubleRoundRobin' }}
        initialState={state}
        onStateChange={handleChange}
      >
        <Competition.Header />

        <Column gap="lg" padding="lg">
          <Card.Root>
            <Card.Title>Add Team</Card.Title>
            <Competition.AddParticipantForm />
          </Card.Root>

          <Card.Root>
            <Card.Title>Add Score</Card.Title>
            <Competition.AddResultForm />
          </Card.Root>

          <Competition.Standings />
        </Column>
      </Competition.Provider>
    </div>
  );
}
