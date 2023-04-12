import { useContext } from "react";
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

const Navbar = () =>{
    const{user, dispatch} = useContext(AuthContext);

    return(
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
                    <span className="logo">Blooming Heartbeat</span>
                </Link>
                {user ? 
                    <div>
                        <span className="username">{user.username}</span>
                        <button onClick={async()=>{dispatch({type:"LOGOUT"})}} className="navButton">Выйти</button>
                    </div>
                :
                    <div className="navItems">
                        <button className="navButton">Регистрация</button>
                        <Link to="/login">
                            <button className="navButton">Войти</button>
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;