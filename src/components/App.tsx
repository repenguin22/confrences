/** library */
import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** firebase */
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../firebase';

/** Custom Components */
import AgendaListNew from './agenda/agendaLists/agendaListNew/AgendaListNew';
import AgendaCreate from './agenda/agendaCreate/AgendaCreate';

/** Material UI Components */
import CssBaseline from '@material-ui/core/CssBaseline';

const App: FC = () => {
    firebase.initializeApp(firebaseConfig);
    return (
        <div>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/" component={AgendaListNew} exact />
                    <Route path="/agenda/new" component={AgendaListNew} exact />
                    <Route path="/agenda/create" component={AgendaCreate} exact />
                    <Route path="/agenda/:id" component={AgendaListNew} exact />
                </Switch>
            </Router>
        </div>
    );
};

export default App;