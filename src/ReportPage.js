import React from 'react';
import ReportForm from './Form';
/* returns the Report Page where users can add data to the map*/
function ReportPage() {
    return (
        <div>
            <h1> Want to report an incident?</h1>
            <h2> Fill out the below form providing accurate information regarding the incident.</h2>
            <ReportForm />
        </div>
    )
}

export default ReportPage;