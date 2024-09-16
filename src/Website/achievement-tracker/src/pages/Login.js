import { useEffect, useState } from "react";
import ExtractPSNTrophies from "../Data/ExtractPSNTrophies";
import ExtractSteamAchievements from "../Data/ExtractSteamAchievements";
import GamesList from "../components/GameList";
import SteamInfo from "../SteamGames.json"
import PSNinfo from "../games.json";
import { Link } from "react-router-dom";

function Login(){

    const[PSNGames, setPSNGames] = useState([]);
    const[SteamGames, setSteamGames] = useState([]);
    const[SteamUser, setSteamUser] = useState("");
   
    
    
    // useEffect(() => {
    //     const Steam = async function(){
    //         //let result = await fetch("/test")
    //          //   .then(SteamInfo => {return SteamInfo.json()});
    //         //setSteamGames(result);
    //         setSteamGames([...PSNinfo]);
    //         console.log(SteamGames);
    //     }

    //     Steam();

    // }, [SteamUser]);

    
    const PSN = async function(){
        let result = await ExtractPSNTrophies("FeonixKing");
        setPSNGames(result);
        console.log(result);
    }

    

    const Steam = async function(){
        let result = await fetch("/test")
            .then(SteamInfo => {return SteamInfo.json()});
        setSteamGames(result);
        console.log("got games")
    }

    return (<div>
        <button onClick={PSN}> PlayStation</button>
        <button onClick={Steam}>Steam</button>
        <button onClick={console.log(PSNGames)}>View PSN</button>
        <button onClick={console.log(SteamGames)}>ViewSteam</button>
        <Link to="/Games" state={{SteamGames: SteamGames, PSNGames: PSNGames}} style={{ textDecoration: 'none' }}>
            <button>Main Page</button>
        </Link>
    </div>)
}


export default Login;