import {CLASES, PROFILE, JOIN, LOGOUTTIPODATOS, JOINMONITOR, NEWROOM, PAYMENT} from '../types';
const initialState = 
    'profile'
;
const tipodatosReducer = (state = initialState, action) => {
    switch(action.type){
        case CLASES :
            return action.payload;
        case PROFILE:
            return action.payload;
        case JOIN:
            return action.payload;
        case JOINMONITOR:
            return action.payload;
        case NEWROOM:
            return action.payload;
        case PAYMENT:
            return action.payload;
        case LOGOUTTIPODATOS:
            return initialState;
        default : 
            return state
    }
}
export default tipodatosReducer;