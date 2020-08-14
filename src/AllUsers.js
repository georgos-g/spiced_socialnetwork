import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import { Link } from "react-router-dom";

export default function AllUsers() {
    //hooks
    const [users, setUsers] = useState([]);

    // Ajax Call Hook
    useEffect(() => {
        async function getData() {
            //data contains all json  
            const { data } = await axios.get("/api/v1/all-users");

            setUsers(data.users);
            //console.log("DATA:", data);
        }

        getData();

    },[]);

    //console.log ("users", users);  
    return (
        <div className="all_users">
            <h2>All the Secret People </h2>
            {users.map((user) => (
                <div key={user.id}>
                    <Link to={"/user/" + user.id}>
                       
                        <div>
                            {user.firstname} {user.lastname}
                            <img src={user.profile_picture_url}></img>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );  
}
