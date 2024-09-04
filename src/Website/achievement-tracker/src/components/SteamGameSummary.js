import ProgressBar from "../components/ProgressBar";

function SteamGameSummary({game}){
    
    return(<div className = "GameOverview">
            <div className = "ChildGameOverview">
                <div className = "imageSect">
                <img className = "GameImage" src ={game[0].trophyTitleIconUrl} width="100%"></img>
                </div>
                <div>
                    <p className = "GameTitleSteam">{game[0].trophyTitleName}</p>
                    <div className = "ProgressBarCSSSteam">
                    <ProgressBar progress={game[0].progress}/>
                    </div>
                </div>
                </div>
            </div>)
  
}

export default SteamGameSummary;