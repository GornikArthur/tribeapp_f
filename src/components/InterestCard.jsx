function InterestCard({ Interest, isMain, fetchUser, handleEditInterest }) {
    const { Interest_id, Title, Description } = Interest;

    const removeInterest = () => {
        fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/remove_interest/${Interest_id}`, {
            method: "POST"
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to save");
            return response.json();
        })
        .then(() => {
            fetchUser(); // Refresh user data
        })
        .catch(error => {
            console.error("Ошибка при удалении интереса:", error);
        });
    };
    

    return (
        <div className="interest">
            <div className="interest-header">
                <span className="interest-title">{Title}</span>
                {isMain && (
                    <div className="button-group">
                        <button className="interest-btn" onClick={() => handleEditInterest(Title, Description)}>
                            <img src="../img/edit-interest.png" alt="Редактировать" />
                        </button>
                        <button className="interest-btn" onClick={removeInterest}>
                            <img src="../img/dislike.png" alt="Удалить" />
                        </button>
                    </div>
                )}
            </div>
            <p>{Description}</p>
        </div>
    );
}

export default InterestCard;
