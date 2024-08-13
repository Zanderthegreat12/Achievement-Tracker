import './App.css';
import games from './games.json';
import MainPage from './pages/MainPage';
import Achievements from './pages/Achievements';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage games = {games}/>}/>
      <Route path="/achievements" element = {<Achievements/>}/>
    </Routes>
  </Router>
  )
}

export default App;
