import { useContext, useState } from "react";
import "./reserve.css"
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen, roomId, data})=>{
    const [selectedRooms, setSelectedRooms] = useState([])
    const {dates} = useContext(SearchContext)

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

    const isAvailable = (roomNumber)=>{
        const isFound = roomNumber.unavailableDates.some((date)=>
            alldates.includes(new Date(date).toLocaleDateString()));

        return !isFound
    }
    const handleSelect = (e)=>{
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item)=>item !== value))
    }
    const navigate = useNavigate()

    const handleClick = async ()=>{
        try{
            await Promise.all(selectedRooms.map(roomId=>{
                const res =axios.put(`/rooms/availability/${roomId}`, {dates:alldates})
                return res.data;
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
                            <input type="checkbox"  value={item._id} onChange={handleSelect} disabled={!isAvailable(item)}/>
                        </div>
                    ))}
                </div>
                <button onClick={handleClick} className="rButton">Забронировать сейчас</button>
            </div>
        </div>
    )
}

export default Reserve;