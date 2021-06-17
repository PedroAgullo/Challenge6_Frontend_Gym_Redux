import {GETROOMMONITOR, LOGOUTROOMMONITOR} from '../types';
const initialState = {
   
};
const getroomuser = (state = initialState, action) => {
    switch(action.type){
        case GETROOMMONITOR :
            return action.payload;
        case LOGOUTROOMMONITOR:
                return initialState;
        default : 
            return state
    }
}
export default getroomuser;