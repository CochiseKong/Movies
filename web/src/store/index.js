import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";  //中间件,允许redux返回函数
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
));

export default store;