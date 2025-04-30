function LikesContactCard({ User, handleClick }) {
    const { Name, Age, Location, TelegramLink } = User;
    const {Country, City} = Location;

    return (
        <button
            className="profile"
            onClick={() => handleClick(User.User_id)}
        >
            <div className="profile-info">
                <h3>{Name}, {Age}</h3>
                <p>📍 {Country}, {City}</p>
            </div>
            <a href={TelegramLink || "#"} className="visit-telegram" target="_blank" rel="noopener noreferrer">
                <img className="telegram-icon" src="img/telegram.png" alt="Telegram" />
            </a>
        </button>
    );
}

export default LikesContactCard
