import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";

function SteamGameSummary({game, page}){
    
    return(<div className = {page[0]}>
        <Link to="/achievements" state={{game: game, origin:"Steam"}} style={{ textDecoration: 'none' }}>
            <div className = {page[1]}>
                <div className = "imageSect">
                <img className = "GameImage" src ={game[0].trophyTitleIconUrl} width="320px" height="176px"></img>
                </div>
                <div>
                    <p className = "GameTitle">{game[0].trophyTitleName}</p>
                    
                    <div className="GameMiddleSect">

                        <div className="text">
                        <b>Playtime: &nbsp;</b> <p>{getTime(game[0].totalPlaytime)} hrs.</p> 
                        </div>
                        
                         
                        <div className = "trophySect">
                            <div className = "trophySubSect">
                                <img src={require("../images/steamRibbonTransparent.png")} width="110%"></img>
                            </div>
                                <div className = "trophySubSect">
                                    <p>{game[0].numAchievementsEarned}/{game[0].numAchievements}</p>
                                </div>
                        </div>
                            
                            
                    </div>
  
                    
                    <div className = "ProgressBarCSS">
                        <ProgressBar progress={game[0].progress}/>
                    </div>
                    </div>
                </div>
                </Link>
            </div>)
  
}

function getTime(date){
    return Math.round((date/60)*10)/10;
}

export default SteamGameSummary;