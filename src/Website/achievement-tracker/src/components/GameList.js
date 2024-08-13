import GameSummary from "./GameSummary";

function GamesList({games}){

    const gameList = games.map( (game) => 
        <GameSummary game = {game}/>
      )
  
    return  <div className = "GameListCSS">{gameList}</div>;
  }

  export default GamesList;