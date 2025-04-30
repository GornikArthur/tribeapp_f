import { useState } from 'react';

function AddNewInterest({ onSave, onCancel, inputTitle, inputDescription }) {
    const [Title, setTitle] = useState(inputTitle || '');
    const [Description, setDescription] = useState(inputDescription || '');

    const handleSaveClick = () => {
        const interest = {
            Title,
            Description
        };
    
        if (!Title.trim()) return; // не продолжаем, если пустой
        const username = window.Telegram.WebApp.initDataUnsafe?.user?.username;
        fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/edit_interest/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interest)
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to save");
            return response.json();
        })
        .then(data => {
            onSave(data); // только после ответа сервера
        })
        .catch(error => {
            console.error("Error saving interest:", error);
        });
    };
    

    return (
        <>
            <div className="interest">
                <input
                    id="new-interest"
                    className="interest-title"
                    type="text"
                    placeholder="Enter interest"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    id="new-description"
                    placeholder="Enter description"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="change-interest">
                <button className="change-interest-buttons" id="save-btn" onClick={handleSaveClick}>Save</button>
                <button className="change-interest-buttons" id="cancel-btn" onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
}

export default AddNewInterest;
