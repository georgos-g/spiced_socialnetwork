import React from 'react';
import axios from './axios.js';
import ProfilePic  from './ProfilePic.js';
import Uploader from './Uploader.js';






export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: 'null',
            uploaderVisible: 'false',
           
        };
    }
    componentDidMount() {//wenn alles geladen ist ausführen
        axios.get('api/v1/me').then(response => {
            this.setState({ user: response.data });
        });
        console.log('I am here GG');
    }
    render() {
        const { user, uploaderVisible } = this.state;
        if (!user) {
            //uploader dummy div ------------------------------------------------------------
            return <div className='user'>Loading......
                <ProfilePic
                    // firstname={user.firstname}
                    // lastname={user.lastname}
                    // profile_pic_url={user.profile_pic_url}
                    clickHandler={(e) => 
                        this.setState({uploaderVisible: false})
                    }
                />
                

            </div>; 
        }

        else {

            return (
                <div className='user'>You are In
                    <ProfilePic
                        firstname={user.firstname}
                        lastname={user.lastname}
                        profile_pic_url={user.profile_pic_url}
                        clickHandler={(e) => 
                            this.setState({uploaderVisible: true})
                        }
                    />

                    {uploaderVisible && (
                        <Uploader
                            closeHandler={(e) =>
                                this.setState({ uploaderVisible: false })
                            }
                            onUploadDone={(newPic) => {
                                this.setState({
                                    uploaderVisible: false, user: {
                                        ...user,
                                        profile_pic_url:newPic
                                    }
                                });

                            }}
                        />
                    )                 
                    }
                 Hi {user.firstname} :-)
                </div>


            );
        }
    }
}


export function App() {
    return (
        <div className="uploader">
            <h1>Welcome Secret Friends </h1>

            {/* React Routing-Bibliothek  */}
            <HashRouter> 
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Register} />
                <Route path="/password-reset" component={PasswordReset} />
            </HashRouter>

        </div>
    );
}