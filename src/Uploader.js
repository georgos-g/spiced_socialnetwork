import React from "react";
import axios from "./axios.js";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {
            file: null,
        };
    }

    async upload() {
        const { file } = this.state;

        const myData = new FormData();
        myData.append("file", file);

        const response = await axios.post(
            "/api/v1/user/profile-upload",
            myData
        );

        const newProfilePictureUrl = response.data.profile_picture_url;
        this.props.onUploadDone(newProfilePictureUrl);
    }
    render() {
        const { closeHandler } = this.props;

        return (
            <div id="uploader">
                <div className="uploader_content">
                    <div className="close_button" onClick={closeHandler}>
                        x
                    </div>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) =>
                            this.setState({
                                file: e.target.files[0],
                            })
                        }
                    />
                    <button onClick={(e) => this.upload()}>UPLOAD</button>
                </div>
            </div>
        );
    }
}
