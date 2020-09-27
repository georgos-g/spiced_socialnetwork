import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import { Link } from "react-router-dom";

export default function FindPeople() {
    // hooks
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    // ajax call hook
    useEffect(() => {
        let unnecessary;
        async function getData() {
            const { data } = await axios.get("/api/v1/users/" + query);
            // unnecessary ajax calls

            if (!unnecessary) {
                setUsers(data);
            }
        }
        if (query) {
            getData();
        }
        return () => {
            unnecessary = true;
        };
    }, [query]);

    return (
        <div><h2>Find other secret keepers... </h2>
            <div className="find_people">
                
                <div className="welcome_image">
                    <img src="./static/secret_2.jpg" alt="" />
                </div>
                <input className="input_find_user"
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
                <div className="users">
                    {users.map((user) => (
                        <div key={user.id}>
                            <Link to={"/user/" + user.id}>
                                <ProfilePic
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                    profilePic={user.profilePic}
                                />
                                <div>
                                    {user.firstname} {user.lastname}
                                </div>
                            </Link>
                        </div>
                    ))}
                    {!users.length && <div id="no_results">No Results</div>}
                </div>
            </div>
        </div>
    );
}
