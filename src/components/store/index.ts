import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import * as api from "../../utils/config";

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const store = createStore(reducers,
    composeEnhancers(
        applyMiddleware(
            thunk.withExtraArgument({
                client:api,
            })
        )
    )
);

export default store;
