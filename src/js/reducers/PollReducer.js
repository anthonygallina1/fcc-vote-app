
const ADD_POLL = "ADD_POLL"
, REMOVE_POLL = "REMOVE_POLL";

function PollReducer (scope=[], action) {
    switch(action.type) {
        case REMOVE_POLL:
            return scope.filter((item)=> item.id !== action.id);
        case ADD_POLL:
            return [
                ...scope,
                { 
                    title: action.title,
                    _id: Math.random()
                }
            ];
        default: return scope;
    }    
}

export default PollReducer;