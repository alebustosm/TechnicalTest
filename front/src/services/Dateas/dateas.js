import { API_URL } from "../utils";

export const validateDocument = async document => {
    let headers = {
        'Content-Type': 'application/json',
    };
    let name = ''

    await fetch(`${API_URL}/api/dateas?document=${document}`, { method: "GET", headers: headers })
        .then(res => res.json())
        .then(loan => {
            name = loan['name'];
        })
    return name

};