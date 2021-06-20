import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import getroomusers from './getroomuser-reducer';
import tipodatos from './tipodatos-reducer';
import getroommonitor from './getroommonitor-reducer';
import editroom from './editroom-reducer';

const rootReducer = combineReducers({
    credentials,
    getroomusers,
    tipodatos,
    getroommonitor,
    editroom

   
});
export default rootReducer;