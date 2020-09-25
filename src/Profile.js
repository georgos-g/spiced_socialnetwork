import React from "react";

export default function Profile({
    firstname,
    lastname,
    bioEditor,
    profilePic,
}) {
    return (
        <div className="profile">
            <div className="welcome_image">
                <img src="./static/secret_2.jpg" alt="" />
            </div>
            <div className="friend_data">
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
        </div>
    );
}
