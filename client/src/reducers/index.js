import {combineReducers} from "redux";
import {authReducer} from "./auth.js";
import {usersReducer} from "./users.js";
import {pingReducer} from "./pingpong.js";

export default combineReducers({
    authReducer,
    usersReducer,
    pingReducer
});