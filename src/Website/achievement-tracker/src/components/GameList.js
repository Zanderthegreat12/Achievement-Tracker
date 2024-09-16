import { useState } from "react";
import GameSummary from "./GameSummary";
import SteamGameSummary from "./SteamGameSummary";

function GamesList({games}){
    const [GAMES, setGames] = useState(games)
    const [sort, setSort] = useState("recent");
    const [filteredGames, setfilteredGames] = useState(games);
    const [searchResult, setsearchResult] = useState("");
    const [gameType, setgameType] = useState("all")
    
    if(games == ""){
      return ("");
    }
    
    const gameList = filteredGames.map( (game) => {
        if(game[0].hasOwnProperty("trophySetVersion")){
          return <GameSummary game = {game} page={["GameOverview","ChildGameOverview"]} />
        } else {
          return <SteamGameSummary game = {game} page={["GameOverview","ChildGameOverview"]}/>
        }
      })

    const SortGames = (sortFnString) =>{
        let sortFn = findSortFn(sortFnString)
        filteredGames.sort((a,b) => sortFn(a,b));
        setfilteredGames(filteredGames);
        setSort(sortFnString);
      }

    const filterGames = (e, type, sortFnString) => {
      if (e.keyCode === 13){
        let search = e.target.value;
        findGamebyWord(search, type, sortFnString)
        setsearchResult(search);
        //e.target.value = "";
      }
    }

    const findGamebyWord = (search, type, sortFnString) =>{
      if (search !== ""){
        search = search.toLowerCase();
        const filterGames = GAMES.filter((game) => {
          let gameName = game[0].trophyTitleName.toLowerCase();
          return gameName.includes(search);
        })
        filterGamesByType(type, filterGames, sortFnString)
      } else {
        filterGamesByType(type, GAMES, sortFnString)
      }
    }

    const filterGamesByType = (type, fg, sortFnString) => {
      if (type === "PSN"){
        const filterGames = fg.filter( (game) => {
          return !game[0].hasOwnProperty("totalPlaytime");
        })
        let sortFn = findSortFn(sortFnString)
        filterGames.sort((a,b) => sortFn(a,b));
        setfilteredGames(filterGames);
        setgameType("PSN")
      } else if (type === "Steam"){
        const filterGames = fg.filter( (game) => {
          return game[0].hasOwnProperty("totalPlaytime");
        })
        let sortFn = findSortFn(sortFnString)
        filterGames.sort((a,b) => sortFn(a,b));
        setfilteredGames(filterGames);
        setgameType("Steam")
      } else {
        let sortFn = findSortFn(sortFnString)
        fg.sort((a,b) => sortFn(a,b));
        setfilteredGames(fg);
        setgameType("All Games")
      }
    }

    if(sort === "recent"){
      filteredGames.sort((a,b) => SortByRecent(a,b));
    }

    if (filteredGames.length !== 0){
    return (
    <div className = "GameListCSS">
      <div className="sortSelector">
      <input className="search" onKeyDown={e => {filterGames(e, gameType,sort)}}></input>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT--W18wy6a2ieVL6AoUwTx7OwzuY1-ncqVeA&s" width="21px"></img>
        <select className="sort" onChange={e => {SortGames(e.target.value)}}>
          <option value={"recent"}>Recently Earned (Des)</option>
          <option value={"recentR"} >Recently Earned (Asc)</option>
          <option value={"nameR"} >Name (Des)</option> 
          <option value={"name"}>Name (Asc)</option>
          <option value={"per"} >Completion Percent (Des)</option>
          <option value={"perR"}>Completion Percent (Asc)</option>
        </select>
        <select className="sort" onChange={e => {findGamebyWord(searchResult, e.target.value, sort)}}>
          <option value={"All"}> All Games</option>
          <option value={"Steam"} > Steam</option>
          <option value={"PSN"} >PSN</option> 
        </select>
      </div>
      {gameList}

      </div>);
    } else {
      return (
        <div className = "GameListCSS">
          <div className="sortSelector">
            <input className="search" onKeyDown={e => {filterGames(e, gameType, sort)}}></input>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT--W18wy6a2ieVL6AoUwTx7OwzuY1-ncqVeA&s" width="21px"></img>
            <select className="sort"  onChange={e => SortGames(e.target.value)}>
              <option value={"recent"}>Recently Earned (Des)</option>
              <option value={"recentR"} >Recently Earned (Asc)</option>
              <option value={"nameR"} >Name (Des)</option> 
              <option value={"name"}>Name (Asc)</option>
              <option value={"per"} >Completion Percent (Des)</option>
              <option value={"perR"}>Completion Percent (Asc)</option>
            </select>
            <select className="sort" onChange={e => {findGamebyWord(searchResult, e.target.value, sort)}}>
              <option value={"All"}> All Games</option>
              <option value={"Steam"} > Steam</option>
              <option value={"PSN"} >PSN</option> 
            </select>
          </div>
          <p className="text"> No results found for: &nbsp; <b> {" "+searchResult}</b>&nbsp; on &nbsp; <b>{gameType}</b> </p>
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