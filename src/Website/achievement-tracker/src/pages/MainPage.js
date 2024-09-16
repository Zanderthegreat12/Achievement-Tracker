import GamesList from "../components/GameList";
import { useLocation  } from "react-router-dom";

function MainPage(){
  const location = useLocation();
  const state = location.state;

  
  let Allgames = state.PSNGames.concat(state.SteamGames);

    return (
        <div className = "Background">
          <h1 className= "Title">Video Game Tracker</h1>
          <GamesList games={Allgames}/>
        </div>
    )    
}



export default MainPage;