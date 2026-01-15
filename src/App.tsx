import './App.css';

import { useState } from 'react';
import { Button } from './components/ui';
import { Eurobasket } from './pages/Eurobasket/Eurobasket';
import { PremierLeague } from './pages/PremierLeague/PremierLeague';
import { Wimbledon } from './pages/Wimbledon/Wimbledon';

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
      <Button size="sm" onClick={() => onChangePage('PremierLeague')}>
        Premier League
      </Button>
      <Button size="sm" onClick={() => onChangePage('Eurobasket')}>
        Eurobasket
      </Button>
      <Button size="sm" onClick={() => onChangePage('Wimbledon')}>
        Wimbledon
      </Button>
    </>
  );
}

export default App;
