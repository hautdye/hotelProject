import "./header.css"
import { Parallax, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import slides from "../../mock.json"
import {DateRange} from 'react-date-range'
import { useContext, useState } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import {ru} from "date-fns/locale"
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";


const Header = () =>{
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(Date.now() + 86400000),
            key: 'selection'
        },
    ]);

    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
            adult: 1,
            children: 0,
            room: 1
    })

    const handleOption = (name, operation) =>{
        setOptions(prev=>{
            return{
            ...prev, [name]: operation === "i" ? options[name]+1 : options[name]-1,
            }
        })
    }

    const {dispatch} =useContext(SearchContext)

    const navigate = useNavigate()

    const handleSearch = () =>{
        dispatch({type:"NEW_SEARCH", payload:{dates, options}})
        navigate("/rooms", {state:{dates, options}})
    }

    return(
        <div className="header">
            <div className="headerContainer">
                <div className="headerListItem">
                    <div className="swiperContainer">
                        <Swiper
                            modules={[Parallax, Autoplay]}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={-1}
                            parallax = {true}
                            speed = {4000}
                            slidesPerView={1}
                        >
                            {slides.map((slide) => (
                                <SwiperSlide key={slide.image}>
                                    <div className="parallax-bg">
                                        <img src={slide.image} alt={slide.title}/>
                                    </div>
                                    <div className="parallax-text" data-swiper-parallax="-500">
                                        <h1>{slide.h1title}</h1>
                                        <p>{slide.ptitle}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText noselect">{`${format(dates[0].startDate, "MM/dd/yy")} до ${format(dates[0].endDate, "MM/dd/yy")}`}</span>
                            {openDate && <DateRange
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                locale={ru}
                                className="date"
                                minDate={new Date()}
                            />}
                        </div>
                        <div className="headerSearchItem">
                            <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText noselect">{`Взрослых ${options.adult} · Детей ${options.children} · Комнат ${options.room}`}</span>
                            { openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Взрослых</span>
                                    <div className="optionCounter">
                                        <button disabled={options.adult <=1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.adult}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                                    </div>
                                </div>    
                                <div className="optionItem">
                                    <span className="optionText">Детей</span>
                                    <div className="optionCounter">
                                        <button disabled={options.children <=0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.children}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Комнат</span>
                                    <div className="optionCounter">
                                        <button disabled={options.room <=1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
                                        <span className="optionCounterNumber">{options.room}</span>
                                        <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="headerSearchItem">
                            <button className="headerButton" onClick={handleSearch}>Найти</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;