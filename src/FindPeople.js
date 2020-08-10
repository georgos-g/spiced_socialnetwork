import React, {useState, useEffect } from 'react';
import axios from './axios.js';


export default function FindPeople() {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    
    // Ajax Call
    useEffect(() => {
        let cancel;
        async () => {
            const { data } = await axios.get('/api/v1/users/' + (query || 'query'));
            if (!cancel) {
                setUsers(data);
                console.log ("data", data);  

                
            }
        };
    });    

    return (<div className='find_people'>
        <h2>Find other secret keepers... </h2>  
        <input
            onChange={(e) => {
                setQuery(e.target.value);
            }}
            
        />
        <div className='users'>
            {users.map((query) => (
                <div key={query.id}>

                </div>
            ))}
        </div>

    </div>

    );
}

