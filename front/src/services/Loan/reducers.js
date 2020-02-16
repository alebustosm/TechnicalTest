const initialState = {
    count: 0,
    results: []
};

export function loanList(state=initialState, action) {
    let data = state;

    switch (action.type) {

        case 'FETCH_LOAN_REQUEST':
            return action.resp;
        
        case 'DELETE_LOAN_REQUEST':
            let new_data = data.results.filter(item => {
                return item.id !== action.resp.id});
            
            return {count: data.count - 1, results:new_data};
        
      

        default:
            return state;
    }
}
