import { useState, useEffect } from 'react';
import citiesByCountry from '../assets/countries.json';

function DataEdit({ User, onSave, onCancel }) {
    const [Name, setName] = useState(User.Name || '');
    const [Country, setCountry] = useState(User.Location?.Country || '');
    const [City, setCity] = useState(User.Location?.City || '');
    const [Age, setAge] = useState(User.Age || 18);

    const handleSaveClick = () => {
        const updatedUser = {
            ...User,
            Name,
            Age,
            Location: { Country, City }
        };
    
        if (Name.trim()) {
            onSave(updatedUser);
        }
    
        fetch("https://miniature-space-adventure-xp4j79wp9grh674w-8000.app.github.dev/edit_user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to save");
            return response.json();
        })
    };    

    useEffect(() => {
        const countryKeys = Object.keys(citiesByCountry);

        if (!countryKeys.includes(Country)) {
            setCountry(countryKeys[0]);
        }
        const cities = citiesByCountry[Country];
        if (cities && cities.length > 0) {
            if (!cities.includes(City)) {
                setCity(cities[0]); // сбрасываем только если текущего города нет в списке
            }
        } else {
            setCity('');
        }
    }, [Country, City]);

    return (
        <>
            <div className="field">
                Name:
                <input
                    className="choose-data"
                    type="text"
                    placeholder="Enter your name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="select-field">
                <label htmlFor="country">Country:</label>
                <select
                    className="choose-data"
                    id="country"
                    value={Country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    {Object.keys(citiesByCountry)?.map((country) => (<option key={country} value={country}>{country}</option>))}
                </select>
            </div>

            <div className="select-field">
                <label htmlFor="city">City:</label>
                <select
                    className="choose-data"
                    id="city"
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                >
                    {[citiesByCountry[Country]?.map((city) => (<option key={city} value={city}>{city}</option>))]}
                </select>
            </div>

            <div className="select-field">
                Age:
                <select
                    className="choose-data"
                    id="age"
                    value={Age}
                    onChange={(e) => setAge(Number(e.target.value))}
                >
                    {Array.from({ length: 89 }, (_, i) => i + 12).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>

            <div className="edit-info">
                <button className="edit-btn" id="cancel-btn" onClick={onCancel}>
                    Cancel
                </button>
                <button className="edit-btn" id="save-btn" onClick={handleSaveClick}>
                    Save
                </button>
            </div>
        </>
    );
}

export default DataEdit;
