import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import user_auth from "./services/Auth/reducers";




const store = createStore(
    combineReducers({user_auth}),
    {},
    applyMiddleware(logger, thunk)
);

export default store;
