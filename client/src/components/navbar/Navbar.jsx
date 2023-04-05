import "./navbar.css"

const Navbar = () =>{
    return(
        <div class="navbar">
            <div className="navContainer">
                <span className="logo">Blooming Heartbeat</span>
                <div className="navItems">
                    <button className="navButton">Регистрация</button>
                    <button className="navButton">Войти</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar;