    import InterestCard from "./InterestCard";

    function InterestsInfo({ Interests, isMain, fetchUser, handleEditInterest }) {
        return (
            <section className="interests">
                <h3>Interests</h3>
                {Interests.map(с_interest => <InterestCard Interest={с_interest} key={с_interest.Interest_id} isMain={isMain} fetchUser={fetchUser} handleEditInterest={handleEditInterest}/>)}    
            </section>
        );
    }

    export default InterestsInfo
