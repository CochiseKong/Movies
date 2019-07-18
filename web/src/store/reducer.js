import { combineReducers } from "redux-immutable"; //整合所有store插件
import { homeReducer } from "../pages/home/store";

const reducer = combineReducers({
    home: homeReducer,
}) 

export default reducer