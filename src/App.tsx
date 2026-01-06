import './App.css';

import { Button, Card, Column, Row } from './components/ui';

function App() {
  return (
    <>
      <div className="app" data-theme="clean">
        <header className="competitionHeader">
          <h1>Premier League</h1>
        </header>

        <Column gap="lg" padding="lg">
          <Card.Root>
            <Card.Title>Add Team</Card.Title>
            <Row>
              <input type="text" placeholder="Team Name" className="grow" />
              <Button>Add</Button>
            </Row>
          </Card.Root>

          <Card.Root>
            <Card.Title>Add Score</Card.Title>
            <Row gap="sm">
              <Column gap="sm">
                <input type="text" placeholder="Home Team" className="grow" />
                <input type="text" placeholder="Home Score" className="grow" />
              </Column>
              <Column gap="sm">
                <input type="text" placeholder="Away Team" className="grow" />
                <input type="text" placeholder="Away Score" />
              </Column>
            </Row>
            <Button>Add Score</Button>
          </Card.Root>

          <section className="standingsGrid">
            <div className="standingsGridHeaders">
              <div>Team</div>
              <div className="center">P</div>
              <div className="center">W</div>
              <div className="center">D</div>
              <div className="center">L</div>
              <div className="center">Pts</div>
            </div>

            <div className="standingsGridRow">
              <div>Man Utd</div>
              <div className="center">10</div>
              <div className="center">4</div>
              <div className="center">2</div>
              <div className="center">2</div>
              <div className="center strong">14</div>
            </div>
            <div className="standingsGridRow">
              <div>Man Utd</div>
              <div className="center">10</div>
              <div className="center">4</div>
              <div className="center">2</div>
              <div className="center">2</div>
              <div className="center strong">14</div>
            </div>
            <div className="standingsGridRow">
              <div>Man Utd</div>
              <div className="center">10</div>
              <div className="center">4</div>
              <div className="center">2</div>
              <div className="center">2</div>
              <div className="center strong">14</div>
            </div>
          </section>
        </Column>
      </div>
    </>
  );
}

export default App;
