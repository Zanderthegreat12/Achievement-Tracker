
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";

function GameSummary({game}){
    return(
<div className = "GameOverview">
<Link to="/achievements" state={{game: game}} style={{ textDecoration: 'none' }}>
        <div className = "ChildGameOverview">
          <div className = "imageSect">
            <img className = "GameImage" src ={game[0].trophyTitleIconUrl}></img>
          </div>
          <div>
            
            <p className = "GameTitle">{game[0].trophyTitleName}</p>
            
            <div className = "trophySect">
              <div className = "trophySubSect">
              <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-bronze.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
              </div>
              <div className = "trophySubSect">
              <p>{game[0].earnedTrophies.bronze}/{game[0].definedTrophies.bronze}</p>
              </div>
            </div>
  
            <div className = "trophySect">
              <div className = "trophySubSect">
                <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-silver.png?url=/assets/trophies/antman-trophy-silver.png&w=3840&q=100" width="75%" height="75%" ></img>
              </div>
              <div className = "trophySubSect">
                <p> {game[0].earnedTrophies.silver}/{game[0].definedTrophies.silver}</p>
              </div>
            </div>
            
            <div className = "trophySect">
              <div className = "trophySubSect">
                <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-gold.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
              </div>
              <div className = "trophySubSect">
                <p>{game[0].earnedTrophies.gold}/{game[0].definedTrophies.gold}</p>
              </div>
            </div>
            
            <div className = "trophySect">
              <div className = "trophySubSect">
                <img src = "https://wrapup.playstation.com/_ipx/w_3840,q_100//assets/trophies/antman-trophy-platinum.png?url=/assets/trophies/antman-trophy-bronze.png&w=3840&q=100" width="75%" height="75%" ></img>
              </div>
              <div className = "trophySubSect">
                <p>{game[0].earnedTrophies.platinum}/{game[0].definedTrophies.platinum}</p>
              </div>
            </div>
            
            <div className = "ProgressBarCSS">
              <ProgressBar progress={game[0].progress}/>
            </div>
          </div>
        </div>
        </Link>
      </div>
    );
}

export default GameSummary;