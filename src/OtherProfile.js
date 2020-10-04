import React from "react";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";
import FriendButton from "./FriendButton.js";

export default class OtherProfile extends React.Component {
    //define props
    constructor(props) {
        super(props);
        this.state = {
            itSelf: false,
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;

        axios
            .get("/api/v1/user/" + userId)
            .then(({ data }) => {
                if (data.itSelf) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        id: data.id,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        profilePic: data.profile_picture_url,
                        bio: data.bio,
                    });
                }
            })
            .catch((error) => {
                //display Error
                console.log("Error in axios.get /user: ", error);
            });
    }
    render() {
        if (!this.state.id) {
            return <div>...Loading</div>;
        }
        return (
            <div>
                <h2>OTHER SECRET KEEPERS</h2>
                <div className="other_profile_top">
                    <div className="other_profile">
                        <div>
                            <ProfilePic
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                profilePic={this.state.profilePic}
                            />
                        </div>
                        <div className="other_profile_data">
                            <h2>
                                {this.state.firstname} {this.state.lastname}
                            </h2>

                            <p className="show_bio">{this.state.bio}</p>
                        </div>

                        <FriendButton otherUserId={this.state.id} />
                    </div>
                </div>
            </div>
        );
    }
}
