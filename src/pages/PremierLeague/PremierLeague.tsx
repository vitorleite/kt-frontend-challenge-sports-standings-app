import { Card, PageLayout } from '@/components/ui';
import { Competition } from '@/features/competition';

import type { CompetitionState } from '@/features/competition/types';
import { useLocalStoragePersistence } from '@/hooks/useLocalStoragePersistence';
import styles from './PremierLeague.module.css';

export function PremierLeague() {
  const { handleChange, state } = useLocalStoragePersistence<CompetitionState>('premier-league');

  return (
    <Competition.Provider
      config={{ title: 'Premier League', matchFormat: 'doubleRoundRobin' }}
      initialState={state}
      onStateChange={handleChange}
    >
      <PageLayout.Root className={styles.premierLeague}>
        <PageLayout.Header>
          <Competition.Header />
        </PageLayout.Header>

        <PageLayout.Grid columns={3}>
          <PageLayout.GridItem>
            <Card.Root>
              <Card.Title>Add Team</Card.Title>
              <Competition.AddParticipantForm />
            </Card.Root>
          </PageLayout.GridItem>

          <PageLayout.GridItem>
            <Card.Root>
              <Card.Title>Add Score</Card.Title>
              <Competition.AddResultForm />
            </Card.Root>
          </PageLayout.GridItem>

          <PageLayout.GridItem>
            <Competition.Standings />
          </PageLayout.GridItem>
        </PageLayout.Grid>
      </PageLayout.Root>
    </Competition.Provider>
  );
}
