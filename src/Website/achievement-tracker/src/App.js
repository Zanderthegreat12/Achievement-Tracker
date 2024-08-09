import './App.css';
import games from './games.json';

function App() {
  return (
    <div className = "Background">
      <h1 className= "Title">Video Game Tracker</h1>
      <GamesList/>
    </div>
  );
}

function GamesList(){

  const gameList = games.map( (game) => 
    <div className = "GameOverview">
      <div className = "ChildGameOverview" onClick={() => {console.log("hello")}}>
        <div className = "imageSect">
          <img className = "GameImage" src ={game[0].trophyTitleIconUrl}></img>
        </div>
        <div>
          
          <p className = "GameTitle">{game[0].trophyTitleName}</p>
          
          <div className = "trophySect">
            <div className = "trophySubSect">
            <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-bronze.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
            </div>
            <div className = "trophySubSect">
            <p>{game[0].earnedTrophies.bronze}/{game[0].definedTrophies.bronze}</p>
            </div>
          </div>

          <div className = "trophySect">
            <div className = "trophySubSect">
              <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-silver.png?url=/assets/trophies/antman-trophy-silver.png&w=3840&q=100" width="75%" height="75%" ></img>
            </div>
            <div className = "trophySubSect">
              <p> {game[0].earnedTrophies.silver}/{game[0].definedTrophies.silver}</p>
            </div>
          </div>
          
          <div className = "trophySect">
            <div className = "trophySubSect">
              <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-gold.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
            </div>
            <div className = "trophySubSect">
              <p>{game[0].earnedTrophies.gold}/{game[0].definedTrophies.gold}</p>
            </div>
          </div>
          
          <div className = "trophySect">
            <div className = "trophySubSect">
              <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-platinum.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
            </div>
            <div className = "trophySubSect">
              <p>{game[0].earnedTrophies.platinum}/{game[0].definedTrophies.platinum}</p>
            </div>
          </div>
          
          <div className = "ProgressBarCSS">
            <ProgressBar progress={game[0].progress}/>
          </div>
        </div>
      </div>
    </div>)

  return  <div className = "GameListCSS">{gameList}</div>;
}

function ProgressBar({progress}){
  let progressVal = progress;
  if (progress < 8){
    progressVal = 8;
  }

  return(
    <div className= "ParentProgress">
      <div className = "ChildProgress" style = {{width: `${progressVal}%`}}>
        <span className = "ProgressText">{`${progress}%`}</span> 
      </div>
    </div>
  )
}


export default App;
