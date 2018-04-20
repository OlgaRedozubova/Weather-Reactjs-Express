import { USERS_ALL, USER_ADD, USER_DEL, USER_GET } from "../constants/ActionTypes";
 import { usersAll } from "../actions";
// import { fetchSecretFulfilled } from "../actions";

export const addUserEpic = action$ =>
    action$.ofType('USER_ADD')
        .delay(1000) // Asynchronously wait 1000ms then continue
        .mapTo({ type: 'USERS_ALL' });


// export const addUserEpic = action$ =>
//     action$.ofType(USER_ADD)
//         .mergeMap(action =>
//             postUserToServer(action.payload, action.password)
//                 .then( response => {
//                     if (response.status === 200) {
//                         return response.json()
//                     } else {
//                         return ''
//                     }
//                 })
//                 .then((response) => {
//
//                     return response
//                 }
//                 )
//                 .catch(err => console.log('err', err))
//         )
//         .map(response => {
//             usersAll(response.token, response.username)});

// async function postUserToServer (username, password) {
//     try {
//         const response = await fetch('/api/users', {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: username,
//                 password: password
//             }),
//         });
//         return await response;
//     } catch(error) {
//         return error;
//     }
// }
