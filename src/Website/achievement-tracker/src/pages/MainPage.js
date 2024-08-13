import GamesList from "../components/GameList";

function MainPage({games}){
    return (
        <div className = "Background">
          <h1 className= "Title">Video Game Tracker</h1>
          <GamesList games={games}/>
        </div>
    )    
}

export default MainPage;