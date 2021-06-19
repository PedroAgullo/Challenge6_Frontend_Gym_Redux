import {EDITROOM} from '../types';
const initialState = {
   _id : ""
};
const getroomuser = (state = initialState, action) => {
    switch(action.type){
        case EDITROOM :
            return action.payload;
        default : 
            return state
    }
}
export default getroomuser;