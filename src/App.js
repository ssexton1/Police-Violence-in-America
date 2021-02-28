import React from 'react';
import Map from './Map';
import AboutPage from './AboutPage';
import Form from './ReportPage';
import Table from './Table';
import { Route, Switch, Redirect} from 'react-router-dom';
import NavBar from './NavBar';
import PersonProfile from './PersonProfile';

/* Returns the main website with links to the following pages: Map, About Page, Form, Table and Person Profile */
function App() {

    return (
        <div className="container-fluid">
            <header>
                <h1 className="pageTitle">Police Violence in America</h1>
            </header>
            <NavBar />

            <Switch>
                <Route exact path="/" render={Map} />
                <Route exact path="/about" component={AboutPage} />
                <Route path="/report" component={Form} />
                <Route path="/map/:raceName"></Route>
                <Route exact path="/table" component={Table} />
                <Route exact path="/table/:personName" component={PersonProfile} />
                <Redirect to="/" />
            </Switch>

            <footer>
                <p>
                    Data from <a href="https://www.kaggle.com/jpmiller/police-violence-in-the-us?select=deaths_arrests.csv">https://www.kaggle.com/jpmiller/police-violence-in-the-us?select=deaths_arrests.csv</a>
                </p>
                <address>
                    Contact us at <a href="EndPoliceBrutality@Gmail.com">EndPoliceBrutality@Gmail.com</a>, or at <a href="tel:866-588-0569">(866) 588-0569</a>.
            </address>
                <p>&copy; 2020</p>
            </footer>

        </div>
    );
}

export default App;