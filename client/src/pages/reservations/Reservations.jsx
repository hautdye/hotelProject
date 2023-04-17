import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import "./reservations.css"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Reservations = () =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`/reservs/${user._id}`)
            .then((getFirst) => {
                const promises = getFirst.data.map((item, index)=>
                    axios.get(`/rooms/${item.roomId}`).then(getSecond => {/*console.log(getFirst.data[index]); console.log(getSecond.data);*/ 
                    getSecond.data["unavailableDates"]=(getFirst.data[index].unavailableDates);
                    getSecond.data["roomNumber"]=(getFirst.data[index].roomNumber);
                    getSecond.data["reservId"]=(getFirst.data[index]._id);
                    getSecond.data["roomNumberId"]=(getFirst.data[index].roomNumberId);
                    console.log(getFirst.data); return getSecond.data;})
                )
                // console.log(getFirst.data)
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

    const handleClick = async (reservId, roomNumberId)=>{
        try{
                await axios.put(`/rooms/availability/${user._id}`, {reservId:reservId, roomNumberId: roomNumberId, delete: "true"}).then(
                    await axios.delete(`/reservs/${user._id}`, {data:{reservId:reservId}})).then(
                        window.location.reload(true)
                    )
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Navbar/>
            <div className="reservationWrap">
                {loading ? (
                    <p>Loading...</p>
                    ) : (
                        <div className="reservlistResults">
                            {data.map(item => (<>
                                <div className="reservlistResult">
                                    <SearchItem className="reservlistSI"  item={item} key={item._id} isViewList={true}/>
                                    <div className="reservlistRight">
                                        <span className="unavailableDates">Команата&nbsp;{item.roomNumber}<br/><br/><br/>{item.unavailableDates[0].slice(0,10)} &nbsp;по&nbsp;{item.unavailableDates.slice(-1)[0].slice(0,10)}</span>
                                        <button onClick={()=>handleClick(item.reservId, item.roomNumberId)} className="cancelButton">Отменить бронь</button>
                                    </div>
                                </div>
                            </>
                            ))}
                            
                        </div>
                )}
            </div>
        </>
    )
}

export default Reservations;
