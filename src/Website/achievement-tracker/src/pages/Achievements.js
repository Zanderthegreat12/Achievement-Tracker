import { useLocation  } from "react-router-dom";
import { useState } from "react";
import GameSummary from "../components/GameSummary";
import AchievementList from "../components/AchievmentList";

function Achievements(){
    const location = useLocation();
    const state = location.state;

    let AchieveGame = state.game;

    const [Achievements, setAchievements] = useState(AchieveGame[1])
    const [sort, setSort] = useState("");



    componentDidMount();

    
    const SortGames = (sortFnString) =>{
        let sortFn = findSortFn(sortFnString)
        
        Achievements.sort((a,b) => sortFn(a,b));
        setAchievements(Achievements);
        setSort(sortFnString);
      }
    if (sort === ""){
        Achievements.sort((a,b) => SortByEarned(a,b))
    }

    return(
        <div className="Background">
            <GameSummary game = {AchieveGame} />
            <div className="sortSelector">
                <select  onChange={e => SortGames(e.target.value)}>
                    <option value={"earned"} >Default </option> 
                    <option value={"trophies"}>Trophy Rarity</option>
                    <option value={"perR"} > Earn Rate (Asc)</option>
                    <option value={"per"}> Earn Rate (Des)</option>
                    <option value={"TimeR"}>Recently Earned (Asc)</option>
                    <option value={"Time"} >Recently Earned (Des)</option>
                </select>
            </div>
            <AchievementList game = {AchieveGame[1]} />
        </div>
    )
}

function componentDidMount() {
    window.scrollTo(0, 0);
}

function SortByTrophies(a,b){
    if (TrophyValue(a[0].trophyType) - TrophyValue(b[0].trophyType) === 0){
        if(EarnedValue(a[0].earned) - EarnedValue(b[0].earned) === 0){
            if (a[0].trophyEarnedRate - b[0].trophyEarnedRate === 0){
                return  a[0].trophyName.localeCompare(b[0].trophyName)
            } else {
                return a[0].trophyEarnedRate - b[0].trophyEarnedRate;
            }
        } else {
            return -(EarnedValue(a[0].earned) - EarnedValue(b[0].earned));
        } 
    } else {
        return -(TrophyValue(a[0].trophyType) - TrophyValue(b[0].trophyType));
    }
}

function SortByPer(a,b){
    if ( -(a[0].trophyEarnedRate - b[0].trophyEarnedRate) === 0){
      return -a[0].trophyName.localeCompare(b[0].trophyName)
    }
    return -(a[0].trophyEarnedRate - b[0].trophyEarnedRate);
}

function SortByPerR(a,b){
    if ( (a[0].trophyEarnedRate - b[0].trophyEarnedRate) === 0){
      return a[0].trophyName.localeCompare(b[0].trophyName)
    }
    return (a[0].trophyEarnedRate - b[0].trophyEarnedRate);
}

function SortByEarned(a,b){
    if(EarnedValue(a[0].earned - EarnedValue(b[0].earned) == 0)){
        return SortByTrophies(a,b)
    } else {
        return -(EarnedValue(a[0].earned) - EarnedValue(b[0].earned));
    }
}

function SortByTime(a,b){
    if(EarnedValue(a[0].earned - EarnedValue(b[0].earned) === 0)){
        if (EarnedValue(a[0].earned) === 0){
            return SortByTrophies(a,b);
        } else {
            return -a[0].earnedDate.localeCompare(b[0].earnedDate)
        }
    } else {
        return -(EarnedValue(a[0].earned) - EarnedValue(b[0].earned));
    }
}

function SortByTimeR(a,b){
    if(EarnedValue(a[0].earned - EarnedValue(b[0].earned) === 0)){
        if (EarnedValue(a[0].earned) === 0){
            return SortByTrophies(a,b);
        } else {
            return a[0].earnedDate.localeCompare(b[0].earnedDate)
        }
    } else {
        return -(EarnedValue(a[0].earned) - EarnedValue(b[0].earned));
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
    } else {
      return SortByTimeR;
    }
}


export default Achievements;