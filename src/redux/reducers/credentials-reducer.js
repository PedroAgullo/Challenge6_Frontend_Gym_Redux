import {LOGIN,LOGOUT, UPDATE} from '../types';
const initialState = {
    user : {},
    token : '',
};
const credentialsReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN :
            return action.payload;
        case LOGOUT:
            return initialState;
        case UPDATE: 
          return action.payload;
        default : 
            return state
    }
}
export default credentialsReducer;