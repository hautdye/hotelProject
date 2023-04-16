import { useContext, useState } from "react"
import "./registration.css"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import Navbar from "../../components/navbar/Navbar"
import { useNavigate } from "react-router-dom"

const Registration = () =>{
    const [credentials, setCredentials] = useState({
        username:undefined,
        email:undefined,
        password:undefined,
    })

    const{loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e)=>{
        setCredentials(prev=>({...prev, [e.target.id]: e.target.value}))
    }

    const handleLogin = async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            await axios.post("/auth/register", credentials)
            const res = await axios.post("/auth/login", {username:credentials.username, password:credentials.password})
            dispatch({type:"LOGIN_SUCCESS", payload: res.data.details})
            navigate("/")
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }
    }

    return(
    <>
        <Navbar/>
        <div className="login">
            <div className="loginContainer">
                <input type="text" placeholder="login" id="username" onChange={handleChange} className="loginInput" />
                <input type="text" placeholder="email@gmail.com" id="email" onChange={handleChange} className="loginInput" />
                <input type="password" placeholder="********" id="password" onChange={handleChange} className="loginInput" />
                <button disabled={loading} className="loginButton" onClick={handleLogin}>Зарегистрироваться</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    </>
    )
}

export default Registration;