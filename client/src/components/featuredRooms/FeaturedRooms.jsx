import useFetch from "../../hooks/useFetch"
import "./featuredRooms.css"

const FeaturedRooms = () =>{

    const {data, loading, error} = useFetch("/rooms?featured=true&limit=4")

    return(
        <div className="roomsContainer">
            {loading ? "Loading" : <>
                { data.map(item=>(
                    <div className="roomItem" key={item._id}>
                        <img src={item.photos[0]} alt="" className="roomImg" />
                        <span className="roomName">{item.title}</span>
                        <span className="roomPrice">{item.price}₸</span>
                        <div className="roomRating">
                            <button>{item.rating}</button>
                            <span>{item.ratingTitle}</span>
                        </div>
                    </div>
                ))}
            </>}
        </div>
    )
}

export default FeaturedRooms