import './App.css';

import { Card, Column } from '@/components/ui';
import { Competition } from '@/features/competition';

function App() {
  return (
    <>
      <div className="app" data-theme="clean">
        <Competition.Provider config={{ title: 'My contextual competition' }}>
          <Competition.Debug />
          <Competition.Header />

          <Column gap="lg" padding="lg">
            <Card.Root>
              <Card.Title>Add Team</Card.Title>
              <Competition.AddParticipantForm />
            </Card.Root>
          </Column>
        </Competition.Provider>
      </div>
    </>
  );
}

export default App;
