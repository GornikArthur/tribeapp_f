import { useEffect, useState } from 'react';
import './edit_prifile_style.css';
import ChangeProfileData from '../components/ChangeProfileData';
import { useNavigate } from "react-router-dom";

function Authentication({ fetchAppUser, setIsAuthenticated }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Добавляем состояние для отслеживания загрузки
    const navigate = useNavigate();

    // Функция для загрузки данных пользователя
    const fetchUser = async () => {
        try {
            const username = window.Telegram.WebApp.initDataUnsafe.user?.username;
            const res = await fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/authentication/${username}`);
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                setIsLoading(false); // Данные загружены, меняем состояние на false
            }
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            setIsLoading(false); // Даже если ошибка, нужно обновить состояние загрузки
        }
    };

    useEffect(() => {
        if (user && user.Age != 0) {
            setIsAuthenticated(true);
            navigate("/search", { replace: true });
        }
    }, [user]);

    useEffect(() => {
        fetchUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleSaveUserData = (updatedUser) => {
        setUser(updatedUser); 
        setIsAuthenticated(true); // Пользователь аутентифицирован
        fetchAppUser(); // Обновляем информацию о пользователе
        navigate("/search", { replace: true }); // Редирект на страницу поиска
    };

    if (!window.Telegram.WebApp.initDataUnsafe.user?.username) {
        return <div>You need to have a Telegram username to use an app...</div>;    
    }

    return (
        <div className="container">
            <ChangeProfileData User={user} onSave={handleSaveUserData} />
        </div>
    );
}

export default Authentication;
