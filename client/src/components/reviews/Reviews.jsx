import "./reviews.css"
 import { EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Reviews = () =>{
    return(
        <div className="revContainer">
            <div className="revItem">
                <Swiper
                 modules={[EffectCoverflow]}
                effect={"coverflow"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    scale: 1,
                     depth: 100,
                    slideShadows: false,
                  }}
                spaceBetween={0}
                autoHeight={true}
                centeredSlides= {true}
                loop= {true}
                slidesPerView={1.5}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                    <div className="slide">
                            <span className="reviewerName">Дмитрий А.</span>
                            <span className="reviewText">Выражаем благодарность персоналу гостиницы. Хочется отметить, что все очень доброжелательные и вежливые,
                             поэтому создается атмосфера хорошего отдыха и отличного настроения. Мы уже дважды здесь побывали, надеемся приехать еще!Огромное Спасибо всем! </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide">
                            <span className="reviewerName">Ирина С.</span>
                            <span className="reviewText">Отличная гостиница. Все чисто, уютно, сделано со вкусом. Приятный дизайн, новая мебель, белоснежные 
                             полотенца. Персонал вежливый и дружелюбный. К уборке нареканий не было. Была приятно удивлена бесплатным вай-фаем с хорошей скоростью и
                              наличием парковки. Обязательно вернусь еще раз. </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide">
                            <span className="reviewerName">Марина У.</span>
                            <span className="reviewText">В отеле очень приятные, любезные администраторы, которые всегда помогут вам по любому вопросу. Нам очень
                             понравилось в этом отеле, останавливались в нем уже 6 раз и хочется возвращаться снова и снова. Спасибо Вам за чистоту, уют и приятное общение.
                              До скорой встречи. </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide">
                            <span className="reviewerName">Андрей К.</span>
                            <span className="reviewText">Отель "Экипаж" оправдал все ожидания. Очень чисто, комфортные номера и приятный персонал. Фото полностью соответствуют
                             действительности. Приятно, когда люди относятся к своему делу с отдачей и ответственностью. </span>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="slide">
                            <span className="reviewerName">Евгений Б.</span>
                            <span className="reviewText">Благодарю за создание такой комфортной гостиницы. В номере новая мебель, удобная кровать, телевизор, холодильник, фен. Чисто. Микроволновая печь на этаже. В целом, есть все, что необходимо.</span>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Reviews