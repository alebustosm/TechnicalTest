const initialLoan = {
    borrower: null,
    borrower_data: {
        first_name: null,
        last_name: null,
        email: null,
        document_number: null,
        gender: null
    },
    amount: null,
    status: null
}


export default function loan(state=initialLoan, action) {
    let data = state;

    switch (action.type) {

        case 'ADD_LOAN_REQUEST':
            
            return action.loan;


        default:
            return state;
    }
}
