import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";

function SteamGameSummary({game}){
    
    return(<div className = "GameOverview">
        <Link to="/achievements" state={{game: game, origin:"Steam"}} style={{ textDecoration: 'none' }}>
            <div className = "ChildGameOverview">
                <div className = "imageSect">
                <img className = "GameImage" src ={game[0].trophyTitleIconUrl} width="320px" height="176px"></img>
                </div>
                <div>
                    <p className = "GameTitleSteam">{game[0].trophyTitleName}</p>
                    <div className = "ProgressBarCSSSteam">
                    <ProgressBar progress={game[0].progress}/>
                    </div>
                </div>
                </div>
                </Link>
            </div>)
  
}

export default SteamGameSummary;