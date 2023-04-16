import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { Ddispatch } = useContext(DarkModeContext);
  const{user, dispatch} = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => Ddispatch({ type: "TOGGLE" })}
            />
          </div>
            
          {user ? 
            <div className="item">
                <img
                  src= {user.img ? user.img : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                  alt=""
                  className="avatar"
                />
                <span className="username">{user.username}</span>
                <button onClick={async()=>{dispatch({type:"LOGOUT"})}} className="navButton">Выйти</button>
            </div> : ""
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
