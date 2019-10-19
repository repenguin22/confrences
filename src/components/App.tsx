/** library */
import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

/** firebase */
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../firebase';

/** Custom Components */
import AboutUs from './aboutus/AboutUs';
import AgendaListBestChoice from './agenda/agendaLists/agendaListBestChoice/AgendaListBestChoice';
import AgendaListNew from './agenda/agendaLists/agendaListNew/AgendaListNew';
import AgendaListSearch from './agenda/agendaLists/agendaListSearch/AgendaListSearch';
import AgendaCreate from './agenda/agendaCreate/AgendaCreate';
import AgendaDetail from './agenda/agendaDetail/AgendaDetail';

/** Material UI Components */
import CssBaseline from '@material-ui/core/CssBaseline';

const App: FC = () => {
    firebase.initializeApp(firebaseConfig);
    ReactGA.initialize('UA-150033688-2');
    return (
        <div>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/" component={AgendaListBestChoice} exact />
                    <Route path="/new" component={AgendaListNew} exact />
                    <Route path="/search" component={AgendaListSearch} exact />
                    <Route path="/agenda/create" component={AgendaCreate} exact />
                    <Route path="/agenda/:id" component={AgendaDetail} exact />
                    <Route path="/aboutus" exact component={AboutUs} />
                    <Route exact component={AgendaListNew} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;