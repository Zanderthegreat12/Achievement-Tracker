import { useLocation } from "react-router-dom";
import GameSummary from "../components/GameSummary";

function Achievements(){
    const location = useLocation();
    const state = location.state;

    let AchieveGame = state.game;

    return(
        <div>
            <GameSummary game = {AchieveGame} />
        </div>
    )
}

export default Achievements;