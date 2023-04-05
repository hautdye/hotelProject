import FeaturedRooms from "../../components/featuredRooms/FeaturedRooms";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Reviews from "../../components/reviews/Reviews";
import "./home.css"

const Home = () =>{
    return(
        <div>
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <h1 className="homeTitle">Популярные среди постоялцев</h1>
                <FeaturedRooms/>
            </div>
            <Reviews/>
            <MailList/>
        </div>
    )
}

export default Home;