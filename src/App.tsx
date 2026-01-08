import './App.css';

import { PremierLeague } from './pages/PremierLeague/PremierLeague';

function App() {
  const showPremierLeague = true;

  return <>{showPremierLeague && <PremierLeague />}</>;
}

export default App;
