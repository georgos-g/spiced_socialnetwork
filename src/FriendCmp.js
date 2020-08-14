import React, { useEffect } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FriendButton from "./FriendButton.js";
import { unFriend, acceptRequest } from "./actions.js";

export default function FriendCmp(props) {
    
    

  

    const { firstname, lastname, profilePic, bio } = props;
    return (<div className='profile'>
        {profilePic}
        <h3>{firstname} {lastname}</h3>
        <p>{bio}</p>
        
        {/* <FriendButton
            otherUserId={props.id}
            onClick={(e) => dispatch(acceptRequest(props.id))}
        /> */}
        
    </div>

    );

}