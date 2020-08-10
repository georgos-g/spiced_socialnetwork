import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    // Ajax Call
    useEffect(() => {
        let unnecessary;
        async () => {
            const { data } = await axios.get("/api/v1/users/" + query);
            //Unnecessary Ajax calls
            if (!unnecessary) {
                setUsers(data);
                console.log("DATA:", data);
            }
        };
        return () => {
            console.log ("Unnecessary Ajax calls:", unnecessary);  
            unnecessary = true;
        };
    }, [query]);

    return (
        <div className="find_people">
            <h2>Find other secret keepers... </h2>
            <input
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
            <div className="users">
                {users.map((user) => (
                    <div key={user.id}>
                        <Link to={'/query/' + user.id}>
                            <ProfilePic
                                firstname={this.data.firstname}
                                lastname= {this.data.lastname}
                                profilePic= {this.data.profilePic}
                            />
                            <div>
                                {user.firstname} {user.lastname} 
                            </div>
                        </Link>
                        
                    </div>
                ))}
                {!users.length && <div id='no_results'>No Results</div> }
            </div>
        </div>
    );
}
