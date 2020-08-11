
import React, { useState, useEffect } from "react";
import axios from "./axios.js";

const NO_REQUEST = "no-request";
const REQUEST_MADE_BY_YOU = "request-made-by-you";
const REQUEST_MADE_TO_YOU = "request-made-to-you";
const REQUEST_ACCEPTED = "request-accepted";


export default function FriendButton(props) {
    const [status, setStatus] = useState();
    console.log ("props", props);  

    const fetchData = async () => {
        console.log("fetchData", fetchData);  
        console.log("props.otherUserId", props.otherUserId); 
        
        const response = await axios.get("/api/v1/friend-request/" + props.otherUserId);
        
        setStatus(response.data.status);
    };

    const makeAjaxCall = async (action) => {
        const myUrl = `/api/v1/friend-request/${action}/${props.otherUserId}`;
        const response = await axios.post(myUrl);
        setStatus(response.data.status);
    };

    useEffect(() => {
        fetchData();          
    }, []);

    if (status == NO_REQUEST) {
        return (<button onClick={e=> makeAjaxCall("make")}>MAKE REQUEST</button>);
    } else if (status == REQUEST_MADE_BY_YOU) {
        return (<button onClick={e=> makeAjaxCall("cancel")}>CANCEL REQUEST</button>);
    } else if (status == REQUEST_MADE_TO_YOU) {
        return (<button onClick={e=> makeAjaxCall("accept")}>ACCEPT REQUEST</button>);
    } else if (status == REQUEST_ACCEPTED) {
        return (<button onClick={e=> makeAjaxCall("unfriend")}>UNFRIEND</button>);   
    } else {
        return (<div> Oops something went wrong!!!</div>);
        

    }
    
}