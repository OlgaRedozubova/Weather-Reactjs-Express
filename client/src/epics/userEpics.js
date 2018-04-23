import { USER_ADD, USER_DEL, USERS_FETCH} from "../constants/ActionTypes";
import { usersAll } from "../actions";


export const addUserEpic = action$ =>
    action$.ofType(USER_ADD)
        .mergeMap(action =>
            postUserToServer(action.username)
                .then( response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        return ''
                    }
                })
                .then((response) => {
                    console.log('response', response);
                    return response
                }
                )
                .catch(err => console.log('err', err))
        )
        // .delay(1000) // Asynchronously wait 1000ms then continue
        // .mapTo({ type: 'USERS_ALL' });
        .map(response => usersAll(response));

async function postUserToServer (username, password) {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username
                //password: password
            }),
        });
        return await response;
    } catch(error) {
        return error;
    }
}

export const fetchUsers = action$ =>
    action$.ofType(USERS_FETCH)
        .mergeMap(action =>
            fetchUsersFromServer()
                .then( response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        return ''
                    }
                })
                .then((response) => {
                        console.log('response', response);
                        return response
                    }
                )
                .catch(err => console.log('err', err))
        )
       // .delay(1000) // Asynchronously wait 1000ms then continue
        // .mapTo({ type: 'USERS_ALL' });
        .map(response => usersAll(response));

async function fetchUsersFromServer () {
    try {
        const response = await fetch('/api/users');
        return await response;
    } catch(error) {
        return error;
    }
}


export const delUserEpic = action$ =>
    action$.ofType(USER_DEL)
        .mergeMap(action =>
            delUserToServer(action.user)
                .then( response => {
                    if (response.status === 200) {
                        return response.json()
                    } else {
                        return ''
                    }
                })
                .then((response) => {
                        console.log('response', response);
                        return response
                    }
                )
                .catch(err => console.log('err', err))
        )
        // .delay(1000) // Asynchronously wait 1000ms then continue
        // .mapTo({ type: 'USERS_ALL' });
        .map(response => usersAll(response));


async function delUserToServer (user) {
    try {
        const response = await fetch('/api/users', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                user: user
            }),
        });
        return await response;
    } catch(error) {
        return error;
    }
}