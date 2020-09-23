import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FriendButton from "./FriendButton.js";
import FriendCmp from "./FriendCmp.js";

import { loadFriendsList, unFriend, acceptRequest } from "./actions.js";

export default function Friends() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFriendsList());
    }, []);

    const friends = useSelector((state) => {
        if (!state.friends) {
            return [];
        } else {
            return state.friends.filter((friend) => {
                return friend.accepted == true;
            });
        }
    });

    const wannabes = useSelector((state) => {
        if (!state.friends) {
            return [];
        } else {
            return state.friends.filter((friend) => {
                return friend.accepted == false;
            });
        }
    });

    return (
        <div>
            <h2>Requests for Friendship </h2>
            {wannabes.length > 0 &&
                wannabes.map((friend) => (
                    <Friend key={friend.id} {...friend} />
                ))}

            {wannabes.length == 0 && (
                <div>You have no friendship request yet...</div>
            )}

            <h2>Secret Friends </h2>
            {friends.length > 0 &&
                friends.map((friend) => <Friend key={friend.id} {...friend} />)}

            {friends.length == 0 && <div>No friends around...</div>}
        </div>
    );
}

function Friend(props) {
    const dispatch = useDispatch();
    return (
        <div className="friend">
            <img src={props.profile_picture_url} />
            <div className="friend_data">
                <FriendCmp
                    firstname={props.firstname}
                    lastname={props.lastname}
                    bio={props.bio}
                />
                <Link to={"/user/" + props.id}>Look at the Profile</Link>
                <br />
                <div className='button'>
                    <FriendButton
                        otherUserId={props.id}
                        onClick={(e) => dispatch(unFriend(props.id))}
                    />
                </div>
            </div>
        </div>
    );
}
