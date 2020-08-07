import React, { useState, useEffect } from "react";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile({ firstname, lastname, bioEditor, profilePic }) {
    return (
        <div className="profile">
            <h2>My Profile</h2>
            {profilePic}
            <div className="username">
                <h2>
                    {firstname} {lastname}
                </h2>
            </div>

            {/* //BIO EDITOR */}

            <h2>My Bio</h2>
            {bioEditor}
        </div>
    );
}
