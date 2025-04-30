
function ContactCard({ User, displayTG }) {
    const { Name, Age, Location, TelegramLink } = User;
    const {Country, City} = Location;

    return (
        <div className="profile">
            <div className="profile-info">
                <h3>{Name}, {Age}</h3>
                <p>📍 {Country}, {City}</p>
            </div>
            {displayTG && (
                <a href={TelegramLink || "#"} className="visit-telegram" target="_blank" rel="noopener noreferrer">
                    <img className="telegram-icon" src="img/telegram.png" alt="Telegram" />
                </a>
            )}
        </div>
    );
}

export default ContactCard
