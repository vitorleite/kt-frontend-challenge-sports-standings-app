import './App.css';

import { PremierLeague } from './pages/PremierLeague/PremierLeague';
import { Eurobasket } from './pages/Eurobasket/Eurobasket';

function App() {
  const showPremierLeague = false;
  const showEurobasket = true;

  return (
    <>
      {showPremierLeague && <PremierLeague />}
      {showEurobasket && <Eurobasket />}
    </>
  );
}

export default App;
