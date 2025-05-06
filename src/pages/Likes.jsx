import { useState, useEffect  } from 'react'
import './likes_page.css'
import LikesContactCard from '../components/LikesContactCard'
import ContactCard from '../components/ContactCard'
import InterestsInfo from '../components/InterestsInfo';
import BottomNav from '../components/BottomNav'

function Likes(){
    const [Users, setUsers] = useState([]);
    const [ShowUserProfile, setShowUserProfile] = useState(false);
    const [LikesUser, setLikesUser] = useState(null);

    useEffect(() => {
        const username = window.Telegram.WebApp.initDataUnsafe.user?.username;
        fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/likes/${username}`)
          .then((res) => res.json())
          .then((data) => {
            setUsers(data);
            setShowUserProfile(false);
        });
    }, []);

    const fetchLikesUser = async (user_id) => {
        const res = await fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/likes-by-id/${user_id}`);
        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        if (!data || Object.keys(data).length === 0) throw new Error("No users left");
        setLikesUser(data);
    };

    const handleClick = (user_id) => {
        fetchLikesUser(user_id);
        setShowUserProfile(true);
    };

    return (
        <div className="container">
            {!ShowUserProfile && (
                <>
                    <h2>Likes</h2>
                    <div className="data">
                        {Users.map(User => <LikesContactCard User={User} key={User.User_id} handleClick={handleClick}/>)}
                        <BottomNav />
                    </div>
                </>
                )}
            {ShowUserProfile && LikesUser && (
                <>
                    <ContactCard User={LikesUser} displayTG={true}/>
                    <InterestsInfo Interests={LikesUser?.Interests} isMain={false} />
                    <BottomNav />                   
                </>
                )}
        </div>
    )
}

export default Likes