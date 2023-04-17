import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Room from './pages/room/Room';
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';
import Reservations from './pages/reservations/Reservations';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rooms" element={<List/>}/>
        <Route path="/rooms/:id" element={<Room/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/reservs/:id" element={<Reservations/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
