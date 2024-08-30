import { useState } from "react";
import GameSummary from "./GameSummary";

function GamesList({games}){
    const [GAMES, setGames] = useState(games)
    const [sort, setSort] = useState("");

    const gameList = GAMES.map( (game) => 
        <GameSummary game = {game}/>
      )

      const SortGames = (sortFnString) =>{
        let sortFn = findSortFn(sortFnString)
        GAMES.sort((a,b) => sortFn(a,b));
        setGames(GAMES);
        setSort(sortFnString);
      }
  
    return (
    <div className = "GameListCSS">
      <div className="sortSelector">
        <input></input>
        <select  onChange={e => SortGames(e.target.value)}>
          <option value={"recent"}>Recently Earned (Des)</option>
          <option value={"recentR"} >Recently Earned (Asc)</option>
          <option value={"nameR"} >Name (Des)</option> 
          <option value={"name"}>Name (Asc)</option>
          <option value={"per"} >Completion Percent (Des)</option>
          <option value={"perR"}>Completion Percent (Asc)</option>
        </select>
      </div>
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

  function findSortFn(sortFnString){
    if ("name" === sortFnString){
        return SortByName;
    } else if ("nameR" === sortFnString){
      return SortByNameR;
    } else if ("per" === sortFnString){
      return SortByPer;
    } else if ("perR" === sortFnString){
      return SortByPerR;
    } else if ("recent" === sortFnString){
      return SortByRecent;
    } else {
      return SortByRecentR;
    }
}
  


  export default GamesList;