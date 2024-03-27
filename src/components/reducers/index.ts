import { combineReducers } from 'redux';
import { products } from './products';
import { count } from './count';

export default combineReducers({
    products,
    count
})