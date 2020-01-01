import { FETCH_PRODUCTS, ADD_PRODUCT, SEARCH_ITEM } from "../actions/types"

const INITIAL_VALUE = {
    products : []
}

const productReducer = (state=INITIAL_VALUE, action) => {
    switch(action.type){
        case SEARCH_ITEM:
            return {...state, products: action.payload}
        case ADD_PRODUCT:
        case FETCH_PRODUCTS :
            return {...state, products: [...state.products, ...action.payload]}
        default:
            return state
    }
}

export default productReducer