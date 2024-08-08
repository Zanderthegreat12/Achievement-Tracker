import './App.css';
import games from './games.json';

function App() {
  let gamesJson = fetch('./games.json').then((res) => {if(!res.ok){
    throw new Error("games.json Does not exist");
    }
    return res.json();
  })
  console.log(gamesJson);

  return (
    <div>
      <h1>Video Game Tracker</h1>
      <GamesList/>
    </div>
  );
}

function GamesList(){

  const gameList = games.map( (game) => 
    <div class = "GameOverview">
      <div class = "imageSect">
        <img src ={game[0].trophyTitleIconUrl}></img>
      </div>
      <div>
        
        <p>{game[0].trophyTitleName}</p>
        
        <div class = "trophySect">
          <div class = "trophySubSect">
          <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-bronze.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
          </div>
          <div class = "trophySubSect">
          <p>{game[0].earnedTrophies.bronze}/{game[0].definedTrophies.bronze}</p>
          </div>
        </div>

        <div class = "trophySect">
          <div class = "trophySubSect">
            <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-silver.png?url=/assets/trophies/antman-trophy-silver.png&w=3840&q=100" width="75%" height="75%" ></img>
          </div>
          <div class = "trophySubSect">
            <p> {game[0].earnedTrophies.silver}/{game[0].definedTrophies.silver}</p>
          </div>
        </div>
        
        <div class = "trophySect">
          <div class = "trophySubSect">
            <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-gold.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
          </div>
          <div class = "trophySubSect">
            <p>{game[0].earnedTrophies.gold}/{game[0].definedTrophies.gold}</p>
          </div>
        </div>
        
        <div class = "trophySect">
          <div class = "trophySubSect">
            <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-platinum.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
          </div>
          <div class = "trophySubSect">
            <p>{game[0].earnedTrophies.platinum}/{game[0].definedTrophies.platinum}</p>
          </div>
        </div>
        
        <div class = "ProgressBarCSS">
          <ProgressBar progress={game[0].progress}/>
        </div>
      
      </div>
    </div>)

  return  <ul>{gameList}</ul>;
}

function ProgressBar({progress}){
  return(
    <div class= "ParentProgress">
      <div class = "ChildProgress" style = {{width: `${progress}%`}}>
        <span>{`${progress}%`}</span> 
      </div>
    </div>
  )
}


export default App;
