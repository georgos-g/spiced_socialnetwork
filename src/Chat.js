import React, { useEffect } from 'react';
import { socket } from './Sockets.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfilePic from './ProfilePic.js';

export default function Chat() { 
    
    const chatMessages = useSelector((state) =>
        state && state.chatMessages);
    
        //For Text Area Chat Message
    const sendMsgButton = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();//no jumping to next line
            //send new chat
            socket.emit('newMessage', event.target.value);
            event.target.value = '';            
        }
    };
    console.log ("chatMessages: ", chatMessages);  
    
    return (
        <div className='chat'>
            <h2>The open Secrets</h2>
            <div className='chat-content'>
                {chatMessages.map((message) => (
                    <div key={message.chats_id} className='chat_single'>
                        <Link to={'/users/' + message.sender_id}>
                            <img src={message.profile_picture_url}/>
                            <div id='chat_name'>
                                {message.firstname} {message.lastname}
                            </div>
                        </Link>
                        <div className='chat_date-message_wrap'>
                            {/* <div className='chat-message-date'>{message.created_at}</div> */}
                            <div className='chat-text'>
                                {message.message_text}
                            </div>
                        </div>
                    </div>
        
                    
                ))

                }

            </div>
            <textarea
                placeholder='Tell us your SECRET and press Enter'
                onKeyDown={sendMsgButton}
            />

        </div>



    );
//----
}


