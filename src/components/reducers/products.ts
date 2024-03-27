import { Constants } from 'components/actions/actions';
import { IAction, IProducts } from 'types';

const defaultState: IProducts = {
    products: [],
}

export function products(state: IProducts = defaultState, action: IAction) {
    switch (action.type) {
        case Constants.ADD_PRODUCT:
            return { ...state, products: [...state.products, action.product] };
        case Constants.GET_PRODUCTS:
            return { ...state, products: [...action.products] };
        case Constants.DELETE_PRODUCT:
            return { ...state, products: state.products.filter((product) => product._id !== action.id) };
        case Constants.ADD_PRODUCT_COUNT:
            // const addCountOfProduct = { ...state.products[action.index], count: state.products[action.index].count + 1 };
            // const addCountOfFoundProduct = [
            //     ...state.products.slice(0, action.index),
            //     addCountOfProduct,
            //     ...state.products.slice(action.index + 1)];
            return { ...state, products: state.products.map((product) => (product._id !== action.id) ? product : { ...product, count: product.count + 1 }) };
        case Constants.REDUCE_PRODUCT_COUNT:
            const reduceCountOfProduct = { ...state.products[action.index], count: state.products[action.index].count - 1 };
            const lesCountOfFoundProduct = [
                ...state.products.slice(0, action.index),
                reduceCountOfProduct,
                ...state.products.slice(action.index + 1)];
            return { ...state, products: lesCountOfFoundProduct };
        default:
            return state;
    }
}
