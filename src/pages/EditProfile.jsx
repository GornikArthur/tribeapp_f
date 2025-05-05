import { useState, useEffect } from 'react';
import './edit_prifile_style.css';
import BottomNav from '../components/BottomNav';
import BasicInfo from '../components/BasicInfo';
import InterestsInfo from '../components/InterestsInfo';
import ContactCard from '../components/ContactCard';
import AddNewInterest from '../components/AddNewInterest';
import ChangeProfileData from '../components/ChangeProfileData';

function EditProfile({fetchAppUser}) {
    const [showNewInterest, setShowNewInterest] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);

    const [editInterestTitle, seteditInterestTitle] = useState();
    const [editInterestDescription, seteditInterestDescription] = useState();

    const [User, setUser] = useState();

    const fetchUser = () => {
        const username = window.Telegram.WebApp.initDataUnsafe.user?.username;
        fetch(`https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/edit/${username}`)
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
        setShowEditProfile(false); 
    };

    const handleEditDataClick = () => setShowEditProfile(true); 
    const handleEditDataCancel = () => setShowEditProfile(false);
    const handleAddInterestClick = () => setShowNewInterest(true);
    const handleAddInterestCancel = () => setShowNewInterest(false);

    const handleEditInterest = (Title, Description) => {
        seteditInterestTitle(Title);
        seteditInterestDescription(Description);
        setShowNewInterest(true); 
    }

    const handleSaveNewInterest = (newInterest) => {
        const updatedUser = {
            ...User,
            Interests: [...(User.Interests || []), { ...newInterest }]
        }
        setUser(updatedUser)
        setShowNewInterest(false);
        fetchUser();
    };

    return (
        <div className="container">
            {!showEditProfile && (<>
                <ContactCard User={User} key={User.User_id} displayTG={false}/>
                <div className="edit-info">
                    <button className="edit-btn" onClick={handleEditDataClick}>Edit Profile</button>
                </div>  
                <InterestsInfo Interests={User?.Interests || []} isMain={true} fetchUser={fetchUser} handleEditInterest={handleEditInterest}/>
                {!showNewInterest && (
                    <button className="add-interest-btn" onClick={handleAddInterestClick}>
                        <img src="../img/add-interest.png" alt="Profile Picture" />
                        New interest
                    </button>
                )}
                {showNewInterest && <AddNewInterest onSave={handleSaveNewInterest} onCancel={handleAddInterestCancel} inputTitle={editInterestTitle} inputDescription={editInterestDescription} />}
                <BottomNav />
            </>)}
            {showEditProfile && (<>
                <ChangeProfileData User={User} onSave={handleSaveUserData} onCancel={handleEditDataCancel}/>
            </>)}
        </div>
    );
}

export default EditProfile;
