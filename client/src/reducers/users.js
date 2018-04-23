import {USERS_ALL, USER_ADD, USERS_FETCH, USER_DEL } from "../constants/ActionTypes";

const INITIAL_STATE = {isPinging: false };
export const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERS_ALL:
            return {
                isPinging: false,
                users:action.users
            };
        case USERS_FETCH:
            return{
                isPinging: true
            };
        case USER_DEL:
            return {
                isPinging: true,
                user: action.user
            };
        case USER_ADD:
            //const newId = state.users
            return {
                isPinging: true,
                username: action.username
            };

        default:
            return state;
    }
};
