import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCESS, AUTH_TOKEN, AUTH_SECRET, AUTH_SECRET_OK, AUTH_SINGOUT} from "../constants/ActionTypes";
import { USERS_ALL, USER_ADD, USERS_FETCH, USER_DEL, USER_GET } from "../constants/ActionTypes";

export const ping = () => ({type: 'PING'});

export const auth = (username) =>(
    {
        type: AUTH_SUCCESS,
        payload: username,
    }
    );

//action creator
export const authRequest = (username, password) => (
    {
        type: AUTH_REQUEST,
        payload: username,
        username:username,
        password: password
    }
    );

export const fetchUserFulfilled = (token, username) => (
    {
        type: AUTH_TOKEN,
        token: token,
        username: username,
        payload: token
    }
    );

export const authSecret = token => (
    {
        type: AUTH_SECRET,
        payload: token,
        token: token
    }
);

export const fetchSecretFulfilled = (payload) => (
    {
        type: AUTH_SECRET_OK,
        //isLogin: isLogin,
        username:payload,
        payload: payload
    }
);


export const authFailure = payload => (
    {
        type: AUTH_FAILURE,
        payload
    }
);

export const authSingOut = () => (
    {
        type: AUTH_SINGOUT
    }
);

//----------- USER
export const usersAll = (users) => (
    {
        type: USERS_ALL,
        users
    }
);

export const usersFetch = () => ({
    type: USERS_FETCH
});


export const userAdd = (username) => (
    {
        type: 'USER_ADD',
        username: username
    }
    );

export const userDel = (user) => (
    {
        type: USER_DEL,
        user
    }
);
export const userGet = () => (
    {
        type: USER_GET
    }
);

//----------------
