// BottomNav.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';

function BottomNav({ onReset }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (path) => {
        if (location.pathname === path) {
            onReset?.(); // вызов сброса состояния
        }
        navigate(path); // перейти на маршрут
    };

    return (
        <nav className="bottom-nav">
            <button onClick={() => handleClick('/likes')}>
                <img src="img/heart.png" alt="Heart" />
            </button>
            <button onClick={() => handleClick('/')}>
                <img src="img/search.png" alt="Search" />
            </button>
            <button onClick={() => handleClick('/edit')}>
                <img src="img/Profile.png" alt="Profile" />
            </button>
        </nav>
    );
}

export default BottomNav;
