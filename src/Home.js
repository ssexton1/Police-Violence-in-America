import React from 'react';

function HomePage() {
    return (
        <div>
            <section className="para" id="para-home">
                Police violence has always been a prevalent issue in America.
                Despite being a problem in America for so long, many people in America still have
                no idea how common of an occurrence police brutality really is. Our hope with this project
                is to help show people the extent of the issue and help drive them to action.
            </section>
            <div className="row row2">
                <div className="col">
                    <img src="img/protest-2.jpg" alt="BLM Protest in black and white" className="small-pic-hidden" />
                </div>

                <div className="col-auto">
                    <form aria-label="Filters for table on police brutality" id="date-form">
                        <div className="form-group mr-2">
                            <label>
                                Date:
                                <input type="date" id="date" name="date" />
                            </label>
                        </div>
                        <input type="submit" value="Submit" form="date-form" id="date-submit" />
                    </form>
                </div>

                <div className="col-4">
                    <table className="center">
                        <thead>
                            <tr>
                                <th id="table-title">Police Brutality Victims by Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td id="date-names"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="col">
                    <img src="img/protest-4.jpg" alt="BLM I Cant Breathe sign in black and white" className="small-pic-hidden" />
                </div>
            </div>
        </div>
    );
}

export default HomePage;