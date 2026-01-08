import { Column, Card } from '@/components/ui';
import { Competition } from '@/features/competition';

import './PremierLeague.css';

export function PremierLeague() {
  return (
    <Competition.Provider config={{ title: 'Premier League' }}>
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
  );
}
