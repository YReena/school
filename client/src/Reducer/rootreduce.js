import studentredux from "./getStudent";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    studentredux : studentredux
});
export default rootReducer ; 