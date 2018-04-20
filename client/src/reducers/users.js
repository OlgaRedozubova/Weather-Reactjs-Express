import {USERS_ALL, USER_ADD, USER_DEL, USER_GET, AUTH_REQUEST, AUTH_TOKEN} from "../constants/ActionTypes";


export const usersReducer = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case 'USERS_ALL':
            return { isPinging: true };

        case 'USER_ADD':
            return { isPinging: false };

        default:
            return state;
    }
};

//
// const INITIAL_STATE = {};
//
// export const usersReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case USER_ADD://AUTH_REQUEST
//             return {
//                 mess: 'OK',
//                 payload: action.payload,
//                 username: action.username,
//                 password: action.password,
//                 isLogin: false
//             };
//         case USERS_ALL://AUTH_TOKEN:
//             return {
//                 mess: 'Token',
//                 payload: action.payload,
//                 token: action.payload,
//                 username: action.username,
//                 isLogin: false
//             };
//
//         // case USERS_ALL:
//         //     return state;
//             // return {
//             //     ...state,
//             //     [action.payload]:action.payload
//             // };
//
//         default:
//             return state;
//     }
// };