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
    <div>
      <p>{game[0].trophyTitleName}</p>
      <img src ={game[0].trophyTitleIconUrl}></img>
    </div>)

  return  <ul>{gameList}</ul>;
}


export default App;
