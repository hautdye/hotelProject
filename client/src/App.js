import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Room from './pages/room/Room';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rooms" element={<List/>}/>
        <Route path="/rooms/:id" element={<Room/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
