import { useLocation } from "react-router-dom";
import GameSummary from "../components/GameSummary";

function Achievements(){
    const location = useLocation();
    const state = location.state;

    let AchieveGame = state.game;

    return(
        <div>
            <GameSummary game = {AchieveGame} />
            <AchievementList game = {AchieveGame[1]} />
        </div>
    )
}

function AchievementList({game}){
    console.log(game)
    const AchieveList = game.map((achieve) =>
        <div className="GameOverview">
            <div className="achievSect">
                <img src={achieve[0].trophyIcon}></img>
            </div>
            <div className="achievSect">
                <p>{achieve[0].trophyName}</p>   
                <p>{achieve[0].trophyDetail}</p>
            </div>
            <div className="achievSect">
                <p>{achieve[0].earnedDate}</p>
            </div>
            <div className="achievSect">
                <img src={determineRare(achieve[0].trophyType)}></img>
            </div>
            <div className="achievSect">
                <p>{achieve[0].trophyEarnedRate}%</p>
            </div>
        </div>);

    return(
        <div>{AchieveList}</div>
    )
}

function determineRare(Trophytype){
    if(Trophytype === "bronze"){
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-bronze.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100";
    } else if (Trophytype === "silver"){
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-silver.png?url=/assets/trophies/antman-trophy-silver.png&w=3840&q=100";
    } else if (Trophytype === "gold"){
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-gold.png?url=/assets/trophies/antman-trophy-gold.png&w=3840&q=100";
    } else {
        return "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-platinum.png?url=/assets/trophies/antman-trophy-platinum.png&w=3840&q=100";
    }
}

export default Achievements;