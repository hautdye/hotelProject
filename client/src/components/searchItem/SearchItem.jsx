import { Link } from "react-router-dom";
import "./searchItem.css"

const SearchItem = ({item, dates, options}) =>{
    return(
        <div className="searchItem">
            <img src={item.photos[0]} alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item.title}</h1>
                <span className="siSubTitle">{item.subtitle}</span>
                <span className="siFeatures">{item.features}</span>
            </div>
            <div className="siDetails">
                <div className="siRating">
                    <span>{item.ratingTitle}</span>
                    <button>{item.rating}</button>
                </div>
                <div className="siDetailText">
                    <span className="siPrice">{item.price}₸</span>
                    <span className="siTaxOp">Включает налоги и сборы</span>
                    {console.log(dates)}
                    <Link to={`/rooms/${item._id}`} state={{dates:dates, options:options}}>
                        <button className="siCheckButton">Посмотреть места</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem;