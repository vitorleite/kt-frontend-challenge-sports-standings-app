import './App.css';

import { PremierLeague } from './pages/PremierLeague/PremierLeague';
import { Eurobasket } from './pages/Eurobasket/Eurobasket';
import { Wimbledon } from './pages/Wimbledon/Wimbledon';
import { useState } from 'react';
import { Button } from './components/ui';

function App() {
  const [showPremierLeague, setShowPremierLeague] = useState(true);
  const [showEurobasket, setShowEurobasket] = useState(false);
  const [showWimbledon, setShowWimbledon] = useState(false);

  const onChangePage = (page: 'PremierLeague' | 'Eurobasket' | 'Wimbledon') => {
    setShowPremierLeague(page === 'PremierLeague');
    setShowEurobasket(page === 'Eurobasket');
    setShowWimbledon(page === 'Wimbledon');
  };

  return (
    <>
      <div className="pageSwitcher">
        <PageSwitcher onChangePage={onChangePage} />
      </div>

      {showPremierLeague && <PremierLeague />}
      {showEurobasket && <Eurobasket />}
      {showWimbledon && <Wimbledon />}
    </>
  );
}

function PageSwitcher({
  onChangePage
}: {
  onChangePage: (page: 'PremierLeague' | 'Eurobasket' | 'Wimbledon') => void;
}) {
  return (
    <>
      <Button onClick={() => onChangePage('PremierLeague')}>Premier League</Button>
      <Button onClick={() => onChangePage('Eurobasket')}>Eurobasket</Button>
      <Button onClick={() => onChangePage('Wimbledon')}>Wimbledon</Button>
    </>
  );
}

export default App;
