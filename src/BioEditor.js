import React, { useState, useEffect } from "react";
import axios from "./axios.js";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            draft: "",
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSave() {
        axios.post("/api/v1/user/bio", { bio: this.state.draft }).then((response) => {
            this.setState({ isEditing: false });
            this.props.saveHandler(this.state.draft);
        });
    }

    render() {
        const { bio } = this.props;
        const { isEditing, draft } = this.state;

        if (isEditing) {
            return (
                <div className="bio_editor">
                    <textarea
                        name="draft"
                        onChange={(e) => this.handleChange(e)}
                        value={draft || bio}
                    />
                    
                    <button onClick={(e) => this.handleSave()}>Save Bio</button>
                </div>
            );
        } else {
            return (
                <div className="bio_editor">
                    {bio}
                    <a onClick={(e) => this.setState({ isEditing: true })}>
                        {bio ? "edit" : "add bio"}
                    </a>
                </div>
            );
        }
    }
}
