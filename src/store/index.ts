import { createStore, combineReducers } from 'redux';
//import { applyMiddleware } from "redux";
//import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './auth/reducers';

const rootReducer = combineReducers({
    auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
    //const middlewares = [thunkMiddleware];
    //const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducer,
        composeWithDevTools()
        //composeWithDevTools(middleWareEnhancer)
    );

    return store;
}
