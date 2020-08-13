import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function FriendCmp(props) {
    const { firstname, lastname, profilePic } = props;
    return (<div className='profile'>
        {profilePic}
        <h3>{firstname} {lastname}</h3>
        
        
    </div>

    );

}