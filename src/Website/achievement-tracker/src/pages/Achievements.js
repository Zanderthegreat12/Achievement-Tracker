import { useLocation  } from "react-router-dom";
import { useState } from "react";
import GameSummary from "../components/GameSummary";
import AchievementList from "../components/AchievmentList";
import SteamGameSummary from "../components/SteamGameSummary";

function Achievements(){
    const location = useLocation();
    const state = location.state;

    let AchieveGame = state.game;
    let type = state.origin;
    let trophy = ""

    if (type === "PSN"){
        trophy = true;
    } else {
        trophy = false;
    }

    const [Achievements, setAchievements] = useState(AchieveGame[1])
    const [sort, setSort] = useState("");

    componentDidMount();

    if (sort === "" && type === "PSN"){
        Achievements.sort((a,b) => SortByEarned(a,b))
    } else if (sort === "" && type === "Steam"){
       Achievements.sort((a,b) => SortByPer(a,b));
    }

    return(
        <div className="Background">
            {GameType(type, AchieveGame)}
            <div className="sortSelector">
                {SortType(type, Achievements, setAchievements, setSort)}
            </div>
            <AchievementList game = {AchieveGame[1]} trophy={trophy}/>
        </div>
    )
}

function GameType(type, AchieveGame){
    if (type === "PSN"){
        return ( <GameSummary game = {AchieveGame} page={["GameOverviewAchievePage","ChildGameOverviewAchievePage"]}/>)
    } else if (type === "Steam"){
        return (<SteamGameSummary game = {AchieveGame} page = {["GameOverviewAchievePage","ChildGameOverviewAchievePage"]}/>)
    }
}

function SortGames(sortFnString, Achievements, setAchievements, setSort){
    let sortFn = findSortFn(sortFnString)
        
    Achievements.sort((a,b) => sortFn(a,b));
    setAchievements(Achievements);
    setSort(sortFnString);
}

function SortType(type, Achievements, setAchievements, setSort){
    if (type === "PSN"){
        return(<select className="sortAchieve"  onChange={e => SortGames(e.target.value, Achievements, setAchievements, setSort)}>
                    <option value={"earned"} >Default </option> 
                    <option value={"trophies"}>Trophy Rarity</option>
                    <option value={"perR"} > Earn Rate (Asc)</option>
                    <option value={"per"}> Earn Rate (Des)</option>
                    <option value={"TimeR"}>Recently Earned (Asc)</option>
                    <option value={"Time"} >Recently Earned (Des)</option>
    </select>);
    } else if (type === "Steam"){
        return(<select className="sortAchieve"  onChange={e => SortGames(e.target.value, Achievements, setAchievements, setSort)}>
            <option value={"per"}> Earn Rate (Des)</option>
            <option value={"perR"} > Earn Rate (Asc)</option>
            <option value={"steamTime"}> Recently Earned (Asc)</option>
            <option value={"steamTimeR"}> Recently Earned (Asc)</option>
        </select>);
    }
}

function componentDidMount() {
    window.scrollTo(0, 0);
}

function SortByTrophies(a,b){
    if (TrophyValue(a.trophyType) - TrophyValue(b.trophyType) === 0){
        if(EarnedValue(a.earned) - EarnedValue(b.earned) === 0){
            if (a.trophyEarnedRate - b.trophyEarnedRate === 0){
                return  a.trophyName.localeCompare(b.trophyName)
            } else {
                return a.trophyEarnedRate - b.trophyEarnedRate;
            }
        } else {
            return -(EarnedValue(a.earned) - EarnedValue(b.earned));
        } 
    } else {
        return -(TrophyValue(a.trophyType) - TrophyValue(b.trophyType));
    }
}

function SortByPer(a,b){
    if ( -(a.trophyEarnedRate - b.trophyEarnedRate) === 0){
      return -a.trophyName.localeCompare(b.trophyName)
    }
    return -(a.trophyEarnedRate - b.trophyEarnedRate);
}

function SortByPerR(a,b){
    if ( (a.trophyEarnedRate - b.trophyEarnedRate) === 0){
      return a.trophyName.localeCompare(b.trophyName)
    }
    return (a.trophyEarnedRate - b.trophyEarnedRate);
}

function SortByEarned(a,b){
    if(EarnedValue(a.earned - EarnedValue(b.earned) == 0)){
        return SortByTrophies(a,b)
    } else {
        return -(EarnedValue(a.earned) - EarnedValue(b.earned));
    }
}

function SortByTime(a,b){
    if(EarnedValue(a.earned - EarnedValue(b.earned) === 0)){
        if (EarnedValue(a.earned) === 0){
            return SortByTrophies(a,b);
        } else {
            return -a.earnedDate.localeCompare(b.earnedDate)
        }
    } else {
        return -(EarnedValue(a.earned) - EarnedValue(b.earned));
    }
}

function SortByTimeR(a,b){
    if(EarnedValue(a.earned - EarnedValue(b.earned) === 0)){
        if (EarnedValue(a.earned) === 0){
            return SortByTrophies(a,b);
        } else {
            return a.earnedDate.localeCompare(b.earnedDate)
        }
    } else {
        return -(EarnedValue(a.earned) - EarnedValue(b.earned));
    }
}

function SortBySteamTime(a,b){
    if(EarnedValue(a.earned - EarnedValue(b.earned) === 0)){
        if (EarnedValue(a.earned) === 0){
            return SortByPer(a,b);
        } else {
            return -a.earnedDate.localeCompare(b.earnedDate)
        }
    } else {
        return -(EarnedValue(a.earned) - EarnedValue(b.earned));
    }
}

function SortBySteamTimeR(a,b){
    if(EarnedValue(a.earned - EarnedValue(b.earned) === 0)){
        if (EarnedValue(a.earned) === 0){
            return SortByPer(a,b);
        } else {
            return a.earnedDate.localeCompare(b.earnedDate)
        }
    } else {
        return -(EarnedValue(a.earned) - EarnedValue(b.earned));
    }
}

function TrophyValue(a){
    if(a === "bronze"){
        return 1;
    } else if (a === "silver"){
        return 2;
    } else if (a === "gold"){
        return 3;
    } else {
        return 4;
    }
}

function EarnedValue(a){
    if (a){
        return 1;
    } else{
     return 0
    };
}

function findSortFn(sortFnString){
    if ("earned" === sortFnString){
        return SortByEarned;
    } else if ("trophies" === sortFnString){
      return SortByTrophies;
    } else if ("perR" === sortFnString){
      return SortByPerR;
    } else if ("per" === sortFnString){
      return SortByPer;
    } else if ("Time" === sortFnString){
      return SortByTime;
    } else if ("TimeR" === sortFnString) {
      return SortByTimeR;
    } else if ("steamTime" === sortFnString){
        return SortBySteamTime
    } else {
        return SortBySteamTimeR
    }
}


export default Achievements;