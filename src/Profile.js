import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile({
    firstname,
    lastname,
    bioEditor,
    profilePic,
}) {
    return (
        <div className="profile">
            <div className='wellcome_image'>
                <img src="./static/lovehoney.jpg" alt=""/>
            </div>
            <h2>My Profile</h2>
            {profilePic}
            <div className="username">
                <h2>
                    {firstname} {lastname}
                </h2>
            </div>
            <div>
                <h2>My Bio</h2>
                {bioEditor}
            </div>
        </div>
    );
}
