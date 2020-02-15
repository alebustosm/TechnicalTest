export const login = (auth) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', auth.username);
    params.append('password', auth.password);
    params.append('client_id', 'local');
    params.append('client_secret', 'local');

    return dispatch => {
        return fetch(`http://127.0.0.1:8000/o/token/`, {method: "POST", headers:{"Content-Type": "application/x-www-form-urlencoded"},body:params })
            .then(res => res.json())
            .then(resp => {
                return dispatch({
                    type: 'SET_TOKEN',
                    resp:resp
                })
            })
    }
};

