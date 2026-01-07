import './App.css';

import { CompetitionView } from './CompetitionView';

import { Competition } from './features/competition';

function App() {
  return (
    <>
      <div className="app" data-theme="clean">
        <Competition.Provider config={{ title: 'My contextual competition' }}>
          <Competition.Debug />
        </Competition.Provider>
        <CompetitionView />
      </div>
    </>
  );
}

export default App;
