import { useState } from "react";
import GameSummary from "./GameSummary";

function GamesList({games}){
    const [GAMES, setGames] = useState(games)
    const [sort, setSort] = useState("");
    const [filteredGames, setfilteredGames] = useState(games);
    const [searchResult, setsearchResult] = useState("");

    const gameList = filteredGames.map( (game) => 
        <GameSummary game = {game}/>
      )

    const SortGames = (sortFnString) =>{
        let sortFn = findSortFn(sortFnString)
        GAMES.sort((a,b) => sortFn(a,b));
        setGames(GAMES);
        setSort(sortFnString);
      }

    const filterGames = (e) => {
      if (e.keyCode === 13){
        let search = e.target.value;
        if (search !== ""){
          search = search.toLowerCase();
          const filterGames = GAMES.filter((game) => {
            let gameName = game[0].trophyTitleName.toLowerCase();
            return gameName.includes(search);
          })
          setfilteredGames(filterGames);
        } else {
          setfilteredGames(GAMES);
        }
        setsearchResult(search);
        e.target.value = "";
      }
    }

    if(sort === ""){
      filteredGames.sort((a,b) => SortByRecent(a,b));
    }

    if (filteredGames.length !== 0){
    return (
    <div className = "GameListCSS">
      <div className="sortSelector">
      <input className="search" onKeyDown={filterGames}></input>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT--W18wy6a2ieVL6AoUwTx7OwzuY1-ncqVeA&s" width="21px"></img>
        <select className="sort" onChange={e => SortGames(e.target.value)}>
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
    } else {
      return (
        <div className = "GameListCSS">
          <div className="sortSelector">
            <input className="search" onKeyDown={filterGames}></input>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT--W18wy6a2ieVL6AoUwTx7OwzuY1-ncqVeA&s" width="21px"></img>
            <select className="sort"  onChange={e => SortGames(e.target.value)}>
              <option value={"recent"}>Recently Earned (Des)</option>
              <option value={"recentR"} >Recently Earned (Asc)</option>
              <option value={"nameR"} >Name (Des)</option> 
              <option value={"name"}>Name (Asc)</option>
              <option value={"per"} >Completion Percent (Des)</option>
              <option value={"perR"}>Completion Percent (Asc)</option>
            </select>
          </div>
          <p className="text"> No results found for: &nbsp; <b> {" "+searchResult}</b> </p>
          </div>);
    }
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