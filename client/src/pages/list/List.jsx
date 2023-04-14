import "./list.css"
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {format} from "date-fns"
import {DateRange} from 'react-date-range'
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () =>{

    const location = useLocation();

    const [dates, setDates] = useState(location.state.dates)
    const [openDate, setOpenDate] = useState(false)
    const [options,setOptions] = useState(location.state.options)
    const [min,setMin] = useState(undefined)
    const [max,setMax] = useState(undefined)

    const { data, loading, error , reFetch } = useFetch(`/rooms?min=${min || 0}&max=${max || 999999}`)

    const handleClick = () =>{
        reFetch()
    }

    return(
        <div>
            <Navbar/>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Поиск</h1>
                        <div className="lsItem">
                            <label>Дата заезда</label>
                            <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yy")} до ${format(dates[0].endDate, "MM/dd/yy")}`}</span>
                            {openDate && (<DateRange 
                                onChange={item=>setDates([item.selection])}
                                minDate={new Date()}
                                ranges={dates}
                            />)}
                        </div>
                        <div className="lsItem">
                            <label>Параметры</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Минимальная цена</span>
                                    <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Максимальная цена</span>
                                    <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Взрослых</span>
                                    <input type="number" className="lsOptionInput" min={1} placeholder={options.adult} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Детей</span>
                                    <input type="number" className="lsOptionInput" min={0} placeholder={options.children} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Комнат</span>
                                    <input type="number" className="lsOptionInput" min={1} placeholder={options.room} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Найти</button>
                    </div>
                    <div className="listResult">
                        {loading ? "loading" : <>
                            {data.map(item=>(
                                <SearchItem item={item} key={item._id} dates={dates} options={options}/>
                            ))}
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;