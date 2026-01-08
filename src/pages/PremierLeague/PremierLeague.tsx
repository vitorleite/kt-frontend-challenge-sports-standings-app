import { Card } from '@/components/ui';
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
        <div className={styles.gridContainer}>
          <div className={styles.gridHeader}>
            <Competition.Header />
          </div>

          <div className={styles.gridContent}>
            <div className={styles.gridItem}>
              <Card.Root>
                <Card.Title>Add Team</Card.Title>
                <Competition.AddParticipantForm />
              </Card.Root>
            </div>

            <div className={styles.gridItem}>
              <Card.Root>
                <Card.Title>Add Score</Card.Title>
                <Competition.AddResultForm />
              </Card.Root>
            </div>

            <div className={styles.gridItem}>
              <Competition.Standings />
            </div>
          </div>
        </div>
      </Competition.Provider>
    </div>
  );
}
