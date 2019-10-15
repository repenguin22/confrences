import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './auth/reducers';
import { noticeReducer } from './notice/reducers';
import { setAgendaReducer } from './agenda/set/reducers';

// combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    notice: noticeReducer,
    agenda: setAgendaReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {

    const store = createStore(
        rootReducer,
        composeWithDevTools()
    );

    return store;
};
