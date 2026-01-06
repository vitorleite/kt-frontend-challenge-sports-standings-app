import './App.css';

import { Button, Card, Column, InputText, Row, Select } from './components/ui';

function App() {
  return (
    <>
      <div className="app" data-theme="clean">
        <Row padding="lg" className="competitionHeader">
          <h1 className="title">Premier League</h1>
        </Row>

        <Column gap="lg" padding="lg">
          <Card.Root>
            <Card.Title>Add Team</Card.Title>
            <Row>
              <InputText placeholder="Team Name" />
              <Button>Add</Button>
            </Row>
          </Card.Root>

          <Card.Root>
            <Card.Title>Add Score</Card.Title>
            <Row gap="sm">
              <Column gap="sm">
                <Select>
                  <option value={undefined}>Home Team</option>
                  <option value="Man Utd">Man Utd</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="Arsenal">Arsenal</option>
                </Select>
                <InputText placeholder="Home Score" />
              </Column>
              <Column gap="sm">
                <Select>
                  <option value={undefined}>Away Team</option>
                  <option value="Man Utd">Man Utd</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="Arsenal">Arsenal</option>
                </Select>
                <InputText placeholder="Away Score" />
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
