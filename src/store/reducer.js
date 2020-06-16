import * as actionTypes from './action';

const initialState = {
    users: [],
    dataField: {
        id: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        region: '',
        town: '',
        country: '',
        postCode: '',
        contactNumber: ''
    },
    isError: false,
    errorMessage: '',
    errorModal: false,
    formModal: false,
    isEditModal: false,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USER:
            return {
                ...state,
                users : action.payload
            };
        case actionTypes.USE_DATA_FIELD:
            return {
                ...state,
                dataField : action.payload
            };
        case actionTypes.GET_ERROR:
            return {
                ...state,
                isError : action.payload.isError,
                errorMessage : action.payload.errorMessage
            };
        default: return state;
    }
}
export default reducer;