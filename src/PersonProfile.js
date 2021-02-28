import { useParams } from 'react-router-dom';
import {fetchData} from './Data';
import React, {useState, useEffect } from 'react';
/* loads the data of the clicked person and
returns the Profile Card for each indiviudal person that contains details such
as name, age, city, state and gender */
function PersonProfile() {
    const [person, setPerson] = useState({});
    const urlParams = useParams();
    let personName = urlParams.personName;
    useEffect(() => {
        fetchData(personName).then(function (result) {
            setPerson(result);
        });
    }, [personName]);

    return (
        <div className="card">
            <div className="container">
                <h2>{person.name}</h2>
                <p>
                    Race: {person.race} <br />
                    Gender: {person.gender} <br />
                    Age: {person.age} <br />
                    City: {person.city} <br />
                    State: {person.state} <br />
                </p>
            </div>
        </div>
    )
}

export default PersonProfile;