import axios from "./axios.js";


export async function loadFriendsList() {
    const { data } = await axios.get("/api/v1/friends_and_wannabes");
    return {
        type: "LOAD_FRIENDS_LIST",
        friends: data.friends,
    };
}

export async function unFriend(otherUserId) {
    return {
        type: "UNFRIEND",
        otherUserId: otherUserId,
    };
}

export async function acceptRequest(otherUserId) {
    return {
        type: "ACCEPT_REQUEST",
        otherUserId: otherUserId,
    };
}

export async function cancelRequest(otherUserId) {
    return {
        type: "CANCEL_REQUEST",
        otherUserId: otherUserId,
    };
}

export async function chatMessages(messages) {
    return {
        type: "GET_LAST_MESSAGES",
        messages: messages,
    };
}

export async function chatMessage(message) {
    return {
        type: "GET_MESSAGE",
        message: message,
    };
}

export async function removeFriend(id) {
    return {
        type: "REMOVE_FRIEND",
        id: id,
    };
}




