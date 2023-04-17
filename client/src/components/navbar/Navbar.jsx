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
                    <Link to={`/reservs/${user._id}`} style={{color:"inherit", textDecoration:"none"}}>
                        <div className="userInfo">
                            <img
                                src= {user.img ? user.img : "https://ddjkm7nmu27lx.cloudfront.net/154540483/72412972a4584f6fb30bc76d2ad48e26.png"}
                                alt=""
                                className="avatar"
                                />
                            <span className="username">{user.username}</span>
                            <button onClick={async()=>{dispatch({type:"LOGOUT"})}} className="navButton">Выйти</button>
                        </div>
                    </Link>
                :
                    <div className="navItems">
                        <Link to="/registration">
                            <button className="navButton">Регистрация</button>
                        </Link>
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