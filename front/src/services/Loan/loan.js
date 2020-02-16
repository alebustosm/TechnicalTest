import {API_URL,initialLoan} from "../utils";


export const addLoanRequest = async (loanRequest,token) => {
    let headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    let body = JSON.stringify(loanRequest);
    let data = initialLoan

    await fetch(`${API_URL}/api/loansrequest/`, {method: "POST", headers:headers ,body})
        .then(res => res.json())
        .then(loan => {
            data = loan;
        })
    return data;

};



export const updateLoanRequest = async (loanRequest,token) => {
    let headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    let body = JSON.stringify(loanRequest);
    let data = initialLoan

    await fetch(`${API_URL}/api/loansrequest/${loanRequest.id}/`, {method: "PUT", headers:headers ,body})
        .then(res => res.json())
        .then(loan => {
            data = loan;
        })
    return data;

};


export const deleteLoanRequest = (loanRequest,params) => {
    let headers = {
        "Authorization": `Bearer ${params}`,
        "Content-Type": "application/json"
    }
    return (dispatch) => {
        return fetch(`${API_URL}/api/loansrequest/${loanRequest.id}/`, {method: "DELETE", headers:headers})
            .then(res => {
                if (res.ok) {
                    return dispatch({
                        type: 'DELETE_LOAN_REQUEST',
                        resp: loanRequest
                    })
                }
                else{
                    return dispatch({
                        type: 'DELETE_LOAN_REQUEST',
                        resp: {error:"No se ah podido eliminar"}
                    })

                }
            })
    }
};


export const fetchLoanRequest = (params) => {
    let headers = {
        "Authorization": `Bearer ${params}`,
        "Content-Type": "application/json"
    }

    return dispatch => {
        return fetch(`${API_URL}/api/loansrequest/?limit=9999`, {method: "GET",headers:headers })
            .then(res => res.json())
            .then(resp => {
                return dispatch({
                    type: 'FETCH_LOAN_REQUEST',
                    resp:resp
                })
            })
    }
};

