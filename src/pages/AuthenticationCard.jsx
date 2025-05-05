import { useState, useEffect } from 'react';
import './edit_prifile_style.css';
import ChangeProfileData from '../components/ChangeProfileData';
import { useNavigate } from "react-router-dom";

function Authentication({fetchAppUser}) {
    const [User, setUser] = useState();
    const navigate = useNavigate(); // <-- Перенесли сюда, НАВЕРХ

    const fetchUser = () => {
        const username = window.Telegram.WebApp.initDataUnsafe.user?.username;
        fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/authentication/${username}`)
            .then((res) => res.json())
            .then((data) => setUser(data));
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (!User) {
        return <div>Loading...</div>;
    }

    const handleSaveUserData = (updatedUser) => {
        setUser(updatedUser); 
        fetchAppUser();
        navigate("/edit", { replace: true }); // <-- Теперь здесь всё ок
    };

    return (
        <div className="container">
            <ChangeProfileData User={User} onSave={handleSaveUserData}/>
        </div>
    );
}

export default Authentication;
