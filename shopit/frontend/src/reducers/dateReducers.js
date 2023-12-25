import {
    NEW_SEARCH,
    RESET_SEARCH
} from '../constants/dateConstants';

const initState = {
    date: [],
  };

export const searchReducer = (state = initState, action) => {

    switch(action.type) {
        case NEW_SEARCH:
            return action.payload;
        case RESET_SEARCH:
            return INITIAL_STATE;
        default:
            return state;
    }

};
