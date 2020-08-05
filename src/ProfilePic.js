import React from 'react';


export default class ProfilePic extends React.Component {
    constructor() {
        super();
    }

    render() {
        //props für App.js
        const { firstname, lastname, profile_pic_url, clickHandler } = this.props;
        const fullName = `${firstname} ${lastname}`;
        console.log("fullName", fullName);  
        
        if (!profile_pic_url) {

            return (
                <div id='profile_pic' className='pic_placeholder' onClick={clickHandler}>
                    <img src='http://placebeard.it/200'/>
                </div>
            );
        } else {
            return (
                <div id='profile_pic' onClick={clickHandler}>
                    <img scr={profile_pic_url} alt={fullName} />
                </div>
            );
        }     
    }
}