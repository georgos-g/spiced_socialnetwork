import React from "react";
import axios from "./axios.js";
import { BrowserRouter, Route } from "react-router-dom";

import ProfilePic from "./ProfilePic.js";
import ProfileComposition from "./ProfileComposition.js";
//import Profile from "./Profile.js";
import BioEditor from "./BioEditor.js";
import Uploader from "./Uploader.js";
import OtherProfile from "./OtherProfile.js";
import FindPeople from "./FindPeople.js";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "null",
            uploaderVisible: "false",
        };
    }
    componentDidMount() {
        //wenn alles geladen ist ausführen
        axios.get("/api/v1/me").then((response) => {
            this.setState({ user: response.data });
        });
        //console.log("I am here...Me ");
    }
    render() {
        const { user, uploaderVisible } = this.state;
        if (!user) {
            //uploader dummy div
            return <div>I am Loading...</div>;
        } else {
            return (
                <div className="user">
                    {/* You are In Hi {user.firstname} :-)
                    <Profile
                        firstname={user.firstname}
                        lastname={user.lastname}
                        profilePic={
                             */}
                    
                    <ProfilePic
                        firstname={user.firstname}
                        lastname={user.lastname}
                        profile_picture_url={user.profile_picture_url}
                        clickHandler={(e) =>
                            this.setState({ uploaderVisible: true })
                        }
                    />
                    {/* }
                       
                    /> */}

                    {uploaderVisible && (
                        <Uploader
                            closeHandler={(e) =>
                                this.setState({ uploaderVisible: false })
                            }
                            onUploadDone={(newPic) => {
                                this.setState({
                                    uploaderVisible: false,
                                    user: {
                                        ...user,
                                        profile_picture_url: newPic,
                                    },
                                });
                            }}
                        />
                    )}
                    <h2>Hi {user.firstname}:-)</h2>
                    <p>Tell us a secret!</p>

                    <BrowserRouter>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <ProfileComposition
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                    profilePic={
                                        //--------------------------------
                                        <ProfilePic
                                            firstname={user.firstname}
                                            lastname={user.lastname}
                                            profile_picture_url={
                                                user.profile_picture_url
                                            }
                                            clickHandler={(e) =>
                                                this.setState({
                                                    uploaderVisible: true,
                                                })
                                            }
                                        />
                                    }
                                    bioEditor={
                                    
                                        <BioEditor
                                            bio={user.bio}
                                            saveHandler={(newBio) => {
                                                this.setState({
                                                    user: {
                                                        ...user,
                                                        bio: newBio,
                                                    },
                                                });
                                            }}
                                        />
                                    }
                                />
                            )}
                        />
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                    </BrowserRouter>
                </div>
            );
        }
    }
}
