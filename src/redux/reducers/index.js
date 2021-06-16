import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import getroomusers from './getroomuser-reducer';
import tipodatos from './tipodatos.reducer';

const rootReducer = combineReducers({
    credentials,
    getroomusers,
    tipodatos
   
});
export default rootReducer;