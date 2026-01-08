import { Column, Card } from '@/components/ui';
import { Competition } from '@/features/competition';

import styles from './PremierLeague.module.css';

export function PremierLeague() {
  return (
    <div className={`app ${styles.premierLeague}`}>
      <Competition.Provider config={{ title: 'Premier League', matchFormat: 'doubleRoundRobin' }}>
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
