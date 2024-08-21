import { useLocation } from "react-router-dom";
import GameSummary from "../components/GameSummary";

function Achievements(){
    const location = useLocation();
    const state = location.state;

    let AchieveGame = state.game;

    componentDidMount();

    return(
        <div className="Background">
            <GameSummary game = {AchieveGame} />
            <AchievementList game = {AchieveGame[1]} />
        </div>
    )
}

function AchievementList({game}){
    console.log(game)
    const AchieveList = game.map((achieve) =>
        <div className="GameOverview">
            <div className={earned(achieve[0].earned)}>
            <div className="achieveSect">
                <img src={achieve[0].trophyIcon} width="100px"></img>
            </div>
            <div className="achieveDescription">
                <p>{achieve[0].trophyName}</p>   
                <p>{achieve[0].trophyDetail}</p>
            </div>
            <div className="achieveTime">
                <p>{achieve[0].earnedDate}</p>
            </div>
            <div className="achieveSect">
                <img src={determineRare(achieve[0].trophyType)}  width="75px"></img>
            </div>
            <div className="achievePercentParent">
            <div className="achievePercentChild">
                <p>{achieve[0].trophyEarnedRate}%</p>
            </div>
            </div>
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

function earned(isEarned){
    if(isEarned){
        return "achieveChildEarned";
    } else {
        return "achieveChildUnearned";
    }
}

function componentDidMount() {
    window.scrollTo(0, 0);
}

export default Achievements;