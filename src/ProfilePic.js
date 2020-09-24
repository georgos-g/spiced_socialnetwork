import React from 'react';


export default class ProfilePic extends React.Component {
    constructor() {
        super();
    }

    render() {
        //props for App.js for ProfilePic 
        const { firstname, lastname, profilePic, clickHandler } = this.props;
        const fullName = `${firstname} ${lastname}`;
       
        if (!profilePic) {

            return (
                <div id='profile_pic' className='pic_placeholder' onClick={clickHandler}>
                    <img src='./static/secret.jpg'/>
                </div>
            );
        } else {
            return (
                <div id='profile_pic' onClick={clickHandler}>
                    <img src={profilePic} alt={fullName} />
                </div>
            );
        }     
    }
}

