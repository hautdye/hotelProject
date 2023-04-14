import "./room.css"
import Navbar from "../../components/navbar/Navbar"
import MailList from "../../components/mailList/MailList"
import useFetch from "../../hooks/useFetch"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext"
import { AuthContext } from "../../context/AuthContext"
import Reserve from "../../components/reserve/Reserve"

import { Thumbs, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { all } from "axios"

const Room = () =>{
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const {data, loading, error, reFetch} = useFetch(`/rooms/${id}`)
    const [dates, setDates] = useState(location.state.dates)
    const [options,setOptions] = useState(location.state.options)

    const [openModal, setOpenModal] = useState(false);

    // const { dates, options } = useContext(SearchContext)
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 *24;
    function dayDifference(date1, date2){
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff/MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = (dayDifference(dates[0].endDate, dates[0].startDate))

    const handleClick = ()=>{
        if(user){
            setOpenModal(true);
        }
        else{
            navigate("/login")
        }
    }

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return(
        <div>
            <Navbar/>
            {loading ? "loading" : 
            <div className="roomContainer">
                <div className="roomWrapper">
                    <h1 className="roomTitle">{data.title}</h1>
                    <div className="roomImages">
                        {/* {data.photos?.map(photo=>(
                            <div className="roomImageWrapper">
                                <img src={photo} alt="" className="roomImage" />
                            </div>
                        ))} */}
                        <Swiper
                            modules={[Thumbs, EffectFade]}
                            slidesPerView={1}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            allowTouchMove={false}
                            effect="fade"
                        >
                            {data.photos?.map((photo) => (
                                <SwiperSlide key={data.id} className="roomImage">
                                    <img src={photo} alt="" className="roomImage" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                        <Swiper 
                            modules={[Thumbs]}
                            watchSlidesProgress
                            onSwiper={setThumbsSwiper}
                            slidesPerView={all}
                            spaceBetween= {5}
                        >
                            {data.photos?.map((photo) => (
                                <SwiperSlide key={data.id} className="roomImageThumb">
                                    <img src={photo} alt="" className="roomImageThumb" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    <div className="roomDetails">
                        <div className="roomDetailsTexts">
                            <h1 className="roomSubTitle">{data.subtitle}</h1>
                            <p className="roomFeatures">{data.features}</p>
                        </div>
                        <div className="roomDetailsPrice">
                            <h1>Идеально подходит <br/> для {days} суток</h1>
                            <h2>
                                <b>{data.price * days * options.room}₸</b> ({days} суток)
                            </h2>
                            <button onClick={handleClick}>Забронировать</button>
                        </div>
                    </div>
                </div>
            </div>}
            <MailList/>
            {openModal && <Reserve setOpen={setOpenModal} roomId={id} data={data}/>}
        </div>
    )
}

export default Room;