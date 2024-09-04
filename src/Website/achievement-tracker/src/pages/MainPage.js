import GamesList from "../components/GameList";

function MainPage({PSNGames, SteamGames}){
    let Allgames = PSNGames.concat(SteamGames);

    return (
        <div className = "Background">
          <h1 className= "Title">Video Game Tracker</h1>
          <GamesList games={Allgames}/>
        </div>
    )    
}



export default MainPage;