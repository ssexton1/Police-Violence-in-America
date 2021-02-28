import React from 'react';
import AboutBody from './AboutBody';
/* returns the About Page which contains the body and the images*/
function AboutPage() {
    return (
        <div>
            <div>
                <AboutBody />
            </div>
            <div>
                <section className="images">
                    <div className="row">
                        <div className="col">
                            <img src="img/protest.jpg" alt="BLM Protest" />
                        </div>
                        <div className="col">
                            <img src="img/protest-3.jpg" alt="BLM Protest" />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default AboutPage;