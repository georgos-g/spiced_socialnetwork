export default function (state = {}, action) {
    if (action.type == 'LOAD_FRIENDS_LIST') {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    } 
    if (action.type == 'UNFRIEND') {
        state = Object.assign({}, state, {
            friends: state.friends.filter(user => user.id != action.otherUserId)
        });
    }

    return state;
}