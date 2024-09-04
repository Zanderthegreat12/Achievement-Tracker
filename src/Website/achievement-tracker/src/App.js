import './App.css';
import PSNGames from './games.json';
import SteamGames from "./SteamGames.json"
import MainPage from './pages/MainPage';
import Achievements from './pages/Achievements';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage PSNGames = {PSNGames} SteamGames = {SteamGames}/>}/>
      <Route path="/achievements" element = {<Achievements/>}/>
    </Routes>
  </Router>
  )
}

export default App;
