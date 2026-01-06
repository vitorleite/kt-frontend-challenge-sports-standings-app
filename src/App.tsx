import './App.css';

function App() {
  return (
    <>
      <div className="app" data-theme="clean">
        <header className="competitionHeader">
          <h1>Premier League</h1>
        </header>
        <main className="column lg">
          <section className="card">
            <div className="title">Add Team</div>
            <div className="row">
              <input type="text" placeholder="Team Name" className="grow" />
              <button className="primary">Add</button>
            </div>
          </section>

          <section className="card">
            <div className="title">Add Score</div>
            <div className="row">
              <div className="column">
                <input type="text" placeholder="Home Team" className="grow" />
                <input type="text" placeholder="Home Score" className="grow" />
              </div>
              <div className="column">
                <input type="text" placeholder="Away Team" className="grow" />
                <input type="text" placeholder="Away Score" />
              </div>
            </div>
            <button className="primary">Add Score</button>
          </section>

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
        </main>
      </div>
    </>
  );
}

export default App;
