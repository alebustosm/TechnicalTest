import {API_URL} from "../utils";

export const addLoanRequest = loanRequest => {
    let headers = {
        'Content-Type': 'application/json',
        };
    return dispatch => {
        let body = JSON.stringify(loanRequest);
        return fetch(`${API_URL}/api/loansrequest/`, {method: "POST", headers:headers ,body})
            .then(res => res.json())
            .then(loan => {
                return dispatch({
                    type: 'ADD_LOAN_REQUEST',
                    'loan': loan
                })
            })
            
    }
};