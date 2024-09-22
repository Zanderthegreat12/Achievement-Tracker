import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingDots from "../components/LoadingDots";
import { Tooltip } from 'react-tooltip'

function Login(){

    const[PSNGames, setPSNGames] = useState([]);
    const[SteamGames, setSteamGames] = useState([]);
    const[SteamUser, setSteamUser] = useState("");
    const[PSNUser, setPSNUser] = useState("");
    const[SteamLoading, setSteamLoading] = useState("")
    const[PSNLoading, setPSNLoading] = useState("")
    
    
        useEffect(() => {
            if(PSNLoading != ""){
            setPSNLoading("Games Fetched")
            }  ;
        },[PSNGames])

            
        useEffect(() => {
            if(SteamLoading != ""){
            setSteamLoading("Games Fetched")
            };
        },[SteamGames])
    
    
    const PSN = async function(){
        if(PSNUser != ""){
            setPSNLoading(<LoadingDots/>);

            let result = await fetch("/PSNGames/ "+ PSNUser)
                .then(PSNInfo => {return PSNInfo.json()});

            if (result.hasOwnProperty("Error")){
                    setPSNLoading("Invalid PSN Name");
            } else {
                setPSNGames(result);
                console.log("got PSN games")
            }
        }
    }

    
    const Steam = async function(){
        if(SteamUser != ""){
            setSteamLoading(<LoadingDots/>);

            let result = await fetch("/SteamGames/ "+ SteamUser)
            .then(SteamInfo => {return SteamInfo.json()});
            
            if (result.hasOwnProperty("Error")){
                setSteamLoading("Invalid SteamID")
            } else{
                setSteamGames(result);
                console.log("got Steam games")
            }
        }
    }

    const submit = function(e, type){
        if (type === "PSN"){
            if(e.keyCode == 13){
                PSN();
            }

        }
        else if (type === "Steam"){
            if(e.keyCode == 13){
                Steam();
            }
        }
    }

    const changeUser =  function(e, type){
        if (type === "PSN"){
            setPSNUser(e.target.value);
        } else if (type === "Steam"){
            setSteamUser(e.target.value);
        }
    }

    return (<div>
         <h1 className= "Title">Video Game Tracker</h1>
         <div className="GameOverview">
            <div className="LoginChild">
                <div className="LoginText">
                    Welcome to Video Game Tracker!
                    <p>To look at your achievements enter your account info. Please wait until the loading is complete before moving on to the Main page with your achievements.</p>
                </div>
                <div className="LoginSect">
                    <div className="LoginName">PSN Username:
                        <div className="LoginHelpParent">
                                <div className="LoginHelp" >
                                    <a data-tooltip-id="questions" data-tooltip-html="Your PSN Username is the same Username <br> that you login to your PlayStation System" >?</a>
                                </div>
                            </div>          
                    </div>
                    <input onKeyDown={e => {submit(e, "PSN")}} onChange={e => {changeUser(e, "PSN")}}></input>
                    <button className="LoginButton" onClick={PSN}> PlayStation</button>
                    {PSNLoading}
                </div>
                <div className="LoginSect">
                    <div className="LoginName">Steam ID:
                        <div className="LoginHelpParent">
                            <div className="LoginHelp" >
                                <a data-tooltip-id="questions" data-tooltip-html="To Find your Steam ID on the Steam App: <br> 1. Click on your profile in the top right <br> 2. Click on Account Details <br> 3. The SteamID is located underneath your username at the Top" >?</a>
                            </div>
                        </div>
                    </div>
                    <input onKeyDown={e => {submit(e, "Steam")}}  onChange={e => {changeUser(e, "Steam")}}></input>
                    <button className="LoginButton" onClick={Steam}>Steam</button>
                    {SteamLoading}
                </div>
                <Link to="/Games" state={{SteamGames: SteamGames, PSNGames: PSNGames}} style={{ textDecoration: 'none' }}>
                    <div className="LoginButtonMain"> 
                        <button className="LoginButtonMainPage">Main Page</button>
                    </div>
                </Link>
                <Tooltip id="questions" place="right-top"/>
            </div>
        </div>
    </div>)
}


export default Login;