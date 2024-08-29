import { useState } from "react";
import GameSummary from "./GameSummary";

function GamesList({games}){
    const [GAMES, setGames] = useState(games)
    const [rend, setRend] = useState(false);

    const gameList = GAMES.map( (game) => 
        <GameSummary game = {game}/>
      )

      const SortGames = (sortFn) =>{
        GAMES.sort((a,b) => sortFn(a,b));
        setGames(GAMES);
        setRend(!rend);
      }
  
    return (
    <div className = "GameListCSS">
      <button onClick={SortGames.bind(this, SortByName)}>Name (Asc)</button>
      <button onClick={SortGames.bind(this, SortByNameR)}>Name (Des)</button> 
      <button onClick={SortGames.bind(this, SortByPer)}>Completion Percent (Des)</button>
      <button onClick={SortGames.bind(this, SortByPerR)}>Completion Percent (Asc)</button>
      <button onClick={SortGames.bind(this, SortByRecent)}>Recently Earned (Des)</button>
      <button onClick={SortGames.bind(this, SortByRecentR)}>Recently Earned (Asc)</button>
      {gameList}
      </div>);
  }

  function SortByName(a,b){
    return a[0].trophyTitleName.localeCompare(b[0].trophyTitleName);
  }

  function SortByNameR(a,b){
    return -a[0].trophyTitleName.localeCompare(b[0].trophyTitleName);
  }

  function SortByPer(a,b){
    if ( -(a[0].progress - b[0].progress) === 0){
      return -a[0].lastUpdatedDateTime.localeCompare(b[0].lastUpdatedDateTime)
    }
    return -(a[0].progress - b[0].progress);
  }

  function SortByPerR(a,b){
    if ( (a[0].progress - b[0].progress) === 0){
      return -a[0].lastUpdatedDateTime.localeCompare(b[0].lastUpdatedDateTime)
    }
    return a[0].progress - b[0].progress;
  }

  function SortByRecent(a,b){
    return -a[0].lastUpdatedDateTime.localeCompare(b[0].lastUpdatedDateTime)
  }

  function SortByRecentR(a,b){
    return a[0].lastUpdatedDateTime.localeCompare(b[0].lastUpdatedDateTime)
  }

  


  export default GamesList;