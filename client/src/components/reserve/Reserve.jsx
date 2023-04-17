import { useContext, useState } from "react";
import "./reserve.css"
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"

const Reserve = ({setOpen, roomId, data})=>{
    const [selectedRooms, setSelectedRooms] = useState([])
    const [Rooms, setRooms] = useState([])
    const {dates} = useContext(SearchContext)
    const {user} = useContext(AuthContext);

    const getDatesInRange = (start, end)=>{
        const date = new Date(start.getTime());
        let list =[]
        while(date <= end){
            list.push(new Date(date).toLocaleDateString())
            date.setDate(date.getDate()+1)
        }
        return list
    }
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = async (roomNumber)=>{
        try{
            const unavailableDates = await axios.post(`/reservs/unavailable/${user._id}`, {roomNumberId:roomNumber._id});
            const isFound = unavailableDates.data.some((date)=>
            alldates.includes(new Date(date).toLocaleDateString()));
            // console.log(roomNumber.number+isFound)
            if(isFound){
                setRooms((prev)=>[...prev, roomNumber._id])
            }
        }catch(err){
            console.log(err);
        }
    }
    
    data.roomNumbers.map(item => isAvailable(item));



    const handleSelect = (e)=>{
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item)=>item !== value))
    }
    const navigate = useNavigate()

    const handleClick = async ()=>{
        try{
            await Promise.all(selectedRooms.map(async roomNumberId=>{
                const resPost = await axios.post(`/reservs/${user._id}`, {roomNumberId:roomNumberId, unavailableDates:alldates, roomId:roomId});
                const resPut = await axios.put(`/rooms/availability/${user._id}`, {reservId:resPost.data._id, roomNumberId: roomNumberId})
                return resPut.data;
            }))
            setOpen(false)
            navigate("/")
        }catch(err){

        }
    }

    return(
        <div className="reserve">
            <div className="rContainer">
                <button className="rClose" onClick={()=>setOpen(false)}> X </button>
                <span>Выберите комнаты:</span>
                <div className="rItemList">
                    {data.roomNumbers.map(item=>(
                        <div className="rItem" key={item._id}>
                            <label> {item.number} </label>
                            <input type="checkbox"  value={item._id} onChange={handleSelect} disabled={Rooms.includes(item._id)} />
                        </div>
                    ))}
                </div>
                <button onClick={handleClick} className="rButton">Забронировать сейчас</button>
            </div>
        </div>
    )
}

export default Reserve;