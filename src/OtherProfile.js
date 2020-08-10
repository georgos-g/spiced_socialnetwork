import React from "react";
import axios from "./axios.js";
import ProfilePic from "./ProfilePic.js";

export default class OtherProfile extends React.Component {
    //define props
    constructor(props) {
        super(props);
        this.state = {
            itsSelf: false,
           
        };
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        console.log("userId___:", userId);

        axios
            .get('/api/v1/user/' + userId)
            .then(({ data }) => {
                console.log("This is the data: ", data);
                if (data.itsSelf) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        id: data.id,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        profilePic: data.profilePic,
                        bio: data.bio,
                    });
                }
            })
            .catch((error) => {//display Error
                console.log("Error in axios.get /user: ", error);
            });
        //
    }
    render() {
        return (
            <div className='other_profile'>
                <h1>
                    {this.state.firstname} {this.state.lastname}
                </h1>
                <ProfilePic
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    profilePic={this.state.profilePic}
                />
                <p className='show_bio'>{this.state.bio}</p>

            </div>
        );
        
    }
}
