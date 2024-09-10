import { useEffect, useState } from "react";
import ExtractPSNTrophies from "../Data/ExtractPSNTrophies";
import ExtractSteamAchievements from "../Data/ExtractSteamAchievements";

function Login(){

    const[PSNGames, setPSNGames] = useState({});
    const[SteamGames, setSteamGames] = useState({});
    
    const PSN = async function(){
        let result = await ExtractPSNTrophies("FeonixKing");
        setPSNGames(result);
        console.log(result);
    }

    const Steam = async function(){
        let result = await ExtractSteamAchievements("76561198334529069");
        setSteamGames(result);
        console.log(result);
    }

    return (<div>
        <button onClick={PSN}> PlayStation</button>
        <button onClick={Steam}>Steam</button>
        <button onClick={console.log(PSNGames)}>View PSN</button>
        <button onClick={console.log(SteamGames)}>ViewSteam</button>
    </div>)
}


export default Login;