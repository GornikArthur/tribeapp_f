function BasicInfo({ User }) {
    const { Name, Age, Location } = User;
    const {Country, City} = Location;

    return (
        <section className="info">
            <div className="field">{Name}</div>
            <div className="field">{Country}</div>
            <div className="field">{City}</div>
            <div className="field">{Age}</div>
        </section>
    );
}

export default BasicInfo
