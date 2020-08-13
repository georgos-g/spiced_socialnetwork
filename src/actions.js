import axios from "./axios.js";

export async function loadFriendsList() {
    const { data } = await axios.get("/api/v1/friends_and_wannabes");
    console.log("data: ", data);

    return {
        type: "LOAD_FRIENDS_LIST",
        friends: data.friends,
    };
}

export async function unFriend(otherUserId) {//other_User_Id???
    return {
        type: "UNFRIENDS",
        otherUserId: otherUserId,
    };
}
