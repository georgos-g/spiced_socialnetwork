import React from 'react';

export default function ProfileComposition(props) {
    const { firstname, lastname, profilePic, bioEditor } = props;
    return (<div className='profile'>
        {profilePic}
        <h3>{firstname} {lastname}</h3>
        {bioEditor}        
    </div>
    );
}