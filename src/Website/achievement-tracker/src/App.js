import './App.css';
//import PSNGames from './games.json';
//import SteamGames from "./SteamGames.json"
import MainPage from './pages/MainPage';
import Achievements from './pages/Achievements';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';

function App() {
  const PSNGames = ""
  const SteamGames = ""

  return(
  <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Games" element={<MainPage />}/>
      <Route path="/achievements" element = {<Achievements/>}/>
    </Routes>
  </Router>
  )
}

export default App;
