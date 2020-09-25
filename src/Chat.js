import React, { useEffect } from "react";
import { socket } from "./Sockets.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);

    //For Text Area Chat Message
    const sendMsgButton = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); //no jumping to next line
            //send new chat
            socket.emit("newMessage", event.target.value);
            event.target.value = "";
        }
    };
    console.log("chatMessages: ", chatMessages);

    return (
        <div>
            <div>
                {" "}
                <h2>The Secret Chat</h2>
            </div>
            <div className="chat">
                <div className="chat_content">
                    {chatMessages.map((message) => (
                        <div key={message.chats_id} className="chat_single">
                            <Link to={"/user/" + message.user_id}>
                                <div className="chat_photo_text">
                                    <div id="chat_name">
                                        {message.firstname} {message.lastname}
                                    </div>
                                    <img src={message.profile_picture_url} />
                                    <br />{" "}
                                </div>
                            </Link>

                            <div className="chat-text">
                                {message.message_text}
                            </div>
                        </div>
                    ))}
                    <br/>

                    <textarea
                        className="chat_input_field"
                        placeholder="Tell us your SECRET and press Enter"
                        onKeyDown={sendMsgButton}
                    />
                </div>
            </div>
        </div>
    );
}
