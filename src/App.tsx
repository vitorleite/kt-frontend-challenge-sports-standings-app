import './App.css';

import { Card, Column } from '@/components/ui';
import { Competition } from '@/features/competition';

function App() {
  return (
    <>
      <div className="app" data-theme="clean">
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
      </div>
    </>
  );
}

export default App;
