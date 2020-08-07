import React from 'react';


export default class ProfilePic extends React.Component {
    constructor() {
        super();
    }

    render() {
        //props for App.js for ProfilePic 
        const { firstname, lastname, profile_picture_url, clickHandler } = this.props;
        const fullName = `${firstname} ${lastname}`;
        console.log("fullName", fullName);  
        
        if (!profile_picture_url) {

            return (
                <div id='profile_pic' className='pic_placeholder' onClick={clickHandler}>
                    <img src='static/mops.jpg'/>
                </div>
            );
        } else {
            return (
                <div id='profile_pic' onClick={clickHandler}>
                    <img src={profile_picture_url} alt={fullName} />
                </div>
            );
        }     
    }
}