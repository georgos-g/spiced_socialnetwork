import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function WannabeCmp(props) {
    const { firstname, lastname, profilePic, bio} = props;
    return (<div className='profile'>
        {profilePic}
        <h3>{firstname} {lastname}</h3>
        <p>{bio}</p>
        
        
    </div>

    );

}