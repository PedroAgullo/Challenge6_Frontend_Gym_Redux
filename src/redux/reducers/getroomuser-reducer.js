import {GETROOMUSER, LOGOUTROOM} from '../types';
const initialState = {
   
};
const getroomuser = (state = initialState, action) => {
    switch(action.type){
        case GETROOMUSER :
            return action.payload;
        case LOGOUTROOM:
                return initialState;
        default : 
            return state
    }
}
export default getroomuser;