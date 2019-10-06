/** library */
import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** firebase */
import * as firebase from 'firebase/app';
import { firebaseConfig } from '../firebase';

/** Custom Components */
import ThemeListNew from './theme/themeLists/ThemeListNew';

/** Material UI Components */
import CssBaseline from '@material-ui/core/CssBaseline';

const App: FC = () => {
    firebase.initializeApp(firebaseConfig);
    return (
        <div>
            <CssBaseline />
            <Router>
                <Switch>
                    <Route path="/" component={ThemeListNew} exact />
                    <Route path="/new" component={ThemeListNew} exact />
                </Switch>
            </Router>
        </div>
    );
};

export default App;