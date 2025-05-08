import './edit_prifile_style.css';
import BottomNav from '../components/BottomNav';
import LikeDislike from '../components/LikeDislike';
import InterestsInfo from '../components/InterestsInfo';
import ContactCard from '../components/ContactCard';
import { useState, useEffect } from 'react';

function Search() {
    const [currentUserId, setCurrentUserId] = useState(1);
    const [User, setUser] = useState(null);

    const fetchUser = async (lastUserId) => {
        try {
            const username = window.Telegram.WebApp.initDataUnsafe.user?.username;
            const res = await fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/search/${lastUserId}/${username}`);
            if (!res.ok) throw new Error("User not found");

            const data = await res.json();
            if (!data || Object.keys(data).length === 0) throw new Error("No users left");

            setUser(data);
            setCurrentUserId(data.User_id); // обновляем на последнего просмотренного
        } catch (error) {
            console.error("Error fetching User:", error);
            setUser(null);
        }
    };

    const fetchLike = () => {
        const username = window.Telegram.WebApp.initDataUnsafe.user?.username;
        fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/like_user/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(User)
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to save like");
            return response.json();
        })
    };

    useEffect(() => {
        fetchUser(currentUserId); // вызываем только при монтировании
    }, []);

    const handleNext = () => {
        fetchUser(currentUserId); // ищем следующего по текущему ID
    };

    const handleLike = () => {
        fetchLike();
        handleNext();
    };
    return (
        <div className="container">
            {!User && (<div>Loading or no User found...</div>)}
            {User && ( <>
                <ContactCard User={User}  />
                <InterestsInfo Interests={User.Interests} isMain={false} />
                <LikeDislike handleLike={handleLike} handleDisLike={handleNext} />
                </>) }
            <BottomNav />
        </div>
    );
}

export default Search;
