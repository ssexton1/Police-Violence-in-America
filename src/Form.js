import React from 'react';
import { Label, Input } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/database';

/* Returns the Report Form page where the user can upload data including
   Name, Date, Race, and Location regarding a police brutality incidence. */
function ReportForm() {

    let reportDataObj = {
        name: null,
        race: null,
        date: null,
        latitude: null,
        longitude: null
    }

    const handleNameChange = (event) => {
        reportDataObj.name = event.target.value;
    }

    const handleRaceChange = (event) => {
        reportDataObj.race = event.target.value;
    }

    const handleDateChange = (event) => {
        reportDataObj.date = event.target.value;
    }

    const handleLocation = (event) => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(function (position) {
            reportDataObj.latitude = position.coords.latitude;
            reportDataObj.longitude = position.coords.longitude;
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const reportFormVictimsRef = firebase.database().ref('reportFormVictims');
        reportFormVictimsRef.push(reportDataObj);
        alert("Your incident has now been reported and added to our dataset");
    }

    return (
        <div className="row">
            <form className="reportForm col-md-6 col-xs-12" aria-label="Form for reporting police violence incidents">
                <Label>Name:</Label>
                <input type="text" id="name" name="name" onChange={handleNameChange} />

                <br />

                <div onChange={handleRaceChange}>
                    <Label>Race:</Label>
                    <Label>
                        <Input type="radio" id="asian" name="race" value="A" />
                        Asian
                    </Label>
                    <Label>
                        <Input type="radio" id="white" name="race" value="W" />
                        White
                    </Label>
                    <Label>
                        <Input type="radio" id="black" name="race" value="B" />
                        Black
                    </Label>
                    <Label>
                        <Input type="radio" id="hispanic" name="race" value="H" />
                        Hispanic
                    </Label>
                    <Label>
                        <Input type="radio" id="other" name="race" value="O" />
                        Other
                    </Label>
                </div>

                <br />

                <Label>
                    Date:
                    <Input type="date" id="date" name="date" onChange={handleDateChange} />
                </Label>

                <br />

                <Input className="formButton" type="button" value="Get current Location" onClick={handleLocation} />

                <br />

                <Input className="formButton" type="submit" value="Submit" onClick={handleSubmit} />
            </form>
            <img src="img/form-img.jpg" className="col-md-6 small-pic-hidden" alt="BLM Protest" id="blm-form" />
        </div>
    )
}

export default ReportForm;