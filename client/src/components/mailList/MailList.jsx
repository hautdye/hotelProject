import "./mailList.css"

const MailList = () =>{
    return(
        <div className="mailNlocation">
            <div className="mail">
                <h1 className="mailTitle">Присоединяйтесь к нам!</h1>
                <span className="mailDesc">Зарегистрируйтесь чтобы отслеживать информацию о бронировании</span>
                <div className="mailInputContainer">
                    <input type="text" placeholder="Введите почту" />
                    <button>Подписаться</button>
                </div>
            </div>
            <div className="location">
                <span>Как нас найти: ул. Сатпаева, 52А</span>
                <iframe title="map" src="https://maps.google.com/maps?q=44.840055, 65.490909&z=15&output=embed" frameborder="0" style={{border:0}}></iframe>
            </div>
        </div>
    )
}

export default MailList