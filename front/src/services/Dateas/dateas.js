import { API_URL } from "../utils";

export const validateDocument = async document => {
    let headers = {
        'Content-Type': 'application/json',
    };
    let data = {
        full_name:null,
        email:null,
        gender:null
    }

    await fetch(`${API_URL}/api/dateas?document=${document}`, { method: "GET", headers: headers })
        .then(res => res.json())
        .then(loan => {
            data = loan;
        })
    return data;

};