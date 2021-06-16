import {CLASES, PROFILE, JOIN} from '../types';
const initialState = {

};
const tipodatosReducer = (state = initialState, action) => {
    switch(action.type){
        case CLASES :
            return action.payload;
        case PROFILE:
            return action.payload;
        case JOIN:
            return action.payload;
        default : 
            return state
    }
}
export default tipodatosReducer;