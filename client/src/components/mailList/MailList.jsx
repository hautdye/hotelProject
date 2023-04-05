import "./mailList.css"

const MailList = () =>{
    return(
        <div className="mail">
            <h1 className="mailTitle">Присоединяйтесь к нам!</h1>
            <span className="mailDesc">Зарегистрируйтесь чтобы отслеживать информацию о бронировании</span>
            <div className="mailInputContainer">
                <input type="text" placeholder="Введите почту" />
                <button>Подписаться</button>
            </div>
        </div>
    )
}

export default MailList