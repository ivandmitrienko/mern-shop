import { ICount, IAction } from 'types';
import { Constants } from '../actions/actions';

const defaultState: ICount= {
    count: 1,
}

export function count (state = defaultState, action: IAction) {
    switch (action.type) {
        case Constants.ADD_PRICE:
            return { ...state, count: state.count + 1 };
        case Constants.REDUCE_PRICE:
            return { ...state, count: state.count - 1 };
        case Constants.RESTART_COUNT:
            return { ...state, count: defaultState.count };
        default:
            return state;
    }
}
