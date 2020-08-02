import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

import App from './components/app/app.jsx';
import reducer from "./reducer/reducer.js";
import {Operation as dataOperation} from "./reducer/data/data.js";
import {Operation as userOperation, ActionCreator as userActionCreator} from "./reducer/user/user.js";
import {createAPI} from './api.js';
import {LoginStatus} from './const.js';

const onUnauthorized = () => {
  store.dispatch(userActionCreator.setAuthorization(LoginStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(userOperation.requestAuthorization());
store.dispatch(dataOperation.loadMovies());
store.dispatch(dataOperation.loadPromo());
store.dispatch(dataOperation.loadFavorite());


ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);


