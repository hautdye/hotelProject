import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./reservations.css"
import { useState, useEffect } from "react";

const Reservations = () =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/reservs/643c23df793f2c13f68550d3`)
            .then((getFirst) => {
                const promises = getFirst.data.map(item =>
                    axios.get(`/rooms/${item.roomId}`).then(getSecond => getSecond.data)
                )
                return Promise.all(promises)
            })
            .then((roomData) => {
                setData(roomData)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return(
        <>
            <Navbar/>
            <div className="reservationWrap">
                {loading ? (
                    <p>Loading...</p>
                    ) : (
                        <div className="listResult">
                            {data.map(item => (
                                <SearchItem className="listResult" item={item} key={item._id}/>
                                ))}
                        </div>
                )}
            </div>
        </>
    )
}

export default Reservations;
