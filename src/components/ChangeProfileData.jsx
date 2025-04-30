import './change_profile_data_style.css';
import Header from './Header';
import DataEdit from './DataEdit';

function ChangeProfileData({User, onSave, onCancel}) {
    return (
        <>
            <Header editable={true}/>
            <section className="info">
                <DataEdit User={User} onSave={onSave} onCancel={onCancel}/>
            </section>
        </>
    );
}

export default ChangeProfileData
