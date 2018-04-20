import { combineEpics } from 'redux-observable';
import { authEpic, fetchUserEpic, fetchSecterEpic } from './authEpics.js';
import { pingEpic } from './pingEpic.js';

import  { addUserEpic } from './userEpics.js';

export default combineEpics(
    pingEpic,
    authEpic,
    fetchUserEpic,
    fetchSecterEpic,

    addUserEpic

)