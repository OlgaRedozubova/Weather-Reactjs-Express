import {AUTH_FAILURE, AUTH_REQUEST, AUTH_SECRET, AUTH_SUCCESS} from "../constants/ActionTypes";
import { fetchUserFulfilled } from "../actions";
import { fetchSecretFulfilled } from "../actions";

export const authEpic = action$ =>
    action$.ofType(AUTH_SUCCESS) //позже подключить очищение token
    //action$.ofType(AUTH_TOKEN)
        .delay(1000)
        .mapTo({type: AUTH_FAILURE});


export const fetchUserEpic = action$ =>
    action$.ofType(AUTH_REQUEST)
        .mergeMap(action =>
            submitToServer(action.payload, action.password)
                .then( response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        return ''
                    }
                })
                .then((response) => {
                        console.log('--response',response);
                    return response
                }
                )
                .catch(err => console.log('err', err))
        )
        .map(response => fetchUserFulfilled(response.token, response.username));

async function submitToServer(username, password) {
    try {
        const response = await fetch('/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password
            }),
        });
        return await response;
    } catch(error) {
        return error;
    }
}


export const fetchSecterEpic = action$ =>
    action$.ofType(AUTH_SECRET)
        .mergeMap(action =>
            getSecretToServer(action.payload)
                .then(response => {
                    return response.name
                })
                .catch(err => console.log('err', err))
        )
        .map(response => fetchSecretFulfilled(response)
        );


async function getSecretToServer(token) {
    console.log('getSecrettoServer', token);
    try {
        const response = await fetch('/api/auth/secret', {
            method: 'GET',
            headers: {
                "Authorization": "JWT " + token
            }
        });
        const body = await response.json();
        return body;
    } catch(error) {
        return error;
    }
}