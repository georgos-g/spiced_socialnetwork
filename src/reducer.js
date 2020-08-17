
let initialState = {
    chatMessages:[]
};
export default function (state = initialState, action) {
    if (action.type == "LOAD_FRIENDS_LIST") {
        state = Object.assign({}, state, {
            friends: action.friends,
        });
    }
    if (action.type == "UNFRIEND") {
        state = Object.assign({}, state, {
            friends: state.friends.filter(
                (user) => user.id != action.otherUserId
            ),
        });
    }
    if (action.type == "ACCEPT_REQUEST") {
        state = Object.assign({}, state, {
            friends: state.friends.filter(
                (user) => (user.id = action.otherUserId)
            ),
        });
    }


    // zu bearbeiten
    if (action.type == "CANCEL_REQUEST") {
        state = {
            ...state,
            
        };
    }
    //-------------
   


    if (action.type == "GET_LAST_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.messages,
        };
    }

    if (action.type == "GET_MESSAGE") {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.message]
        };
    }


    return state;
}
