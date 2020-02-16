const initialState = {
    access_token: null,
    expires_in: 0,
    token_type: null,
    scope: null,
    refresh_token: null,
    error_description:null,
};


export default function user_auth(state=initialState, action) {

    switch (action.type) {

        case 'SET_TOKEN':
            return action.resp;

        case 'CLEAN_TOKEN':
            console.log(action.resp)
            return action.resp;
        
        default:
            return state;
    }
}