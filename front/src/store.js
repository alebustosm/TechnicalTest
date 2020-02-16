import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import user_auth from "./services/Auth/reducers";
import {loanList} from "./services/Loan/reducers";







const store = createStore(
    combineReducers({user_auth,loanList}),
    {},
    applyMiddleware(logger, thunk)
);

export default store;
