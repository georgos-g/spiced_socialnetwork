import React from 'react';
import axios from './axios';

export default class App extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {//wenn alles geladen ist ausführen
        axios.get('api/vi/me');
        console.log('I am here');
    }
    render() {
        return (
            <div>You are In</div>


        );
    }
}