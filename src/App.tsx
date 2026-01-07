import './App.css';

import { CompetitionView } from './CompetitionView';

import Competition from './components/competition/Competition';

function App() {
  return (
    <>
      <div className="app" data-theme="clean">
        <Competition.Provider config={{ title: 'My contextual competition' }}>
          <Competition.Debug />
          <Competition.AddParticipant />
        </Competition.Provider>
        <CompetitionView />
      </div>
    </>
  );
}

export default App;
