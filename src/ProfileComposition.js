import React from "react";

export default function ProfileComposition(props) {
    const { firstname, lastname, profilePic, bioEditor } = props;
    return (
        <div>
           
            <h2>ABOUT ME</h2>
            <div className="my_self">
                <img src="./static/secret_2.jpg" alt="" />
                <div className="profile profile_myself">
                    <div>{profilePic}</div>
                    <div className="profile_data">
                        <h3>
                            {firstname} {lastname}
                        </h3>

                        <div>{bioEditor} </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
