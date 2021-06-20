import {EDITROOM, DELETE} from '../types';
const initialState = {
   _id : ""
};
const getroomuser = (state = initialState, action) => {
    switch(action.type){
        case EDITROOM :
            return action.payload;
        case DELETE :
            return initialState;
        default : 
            return state
    }
}
export default getroomuser;