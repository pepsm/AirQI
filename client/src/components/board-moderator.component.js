import React, ***REMOVED*** Component***REMOVED*** from "react";
import UserService from "../services/user.service";

export default class BoardModerator extends Component ***REMOVED***
    constructor(props) ***REMOVED***
        super(props);

        this.state = ***REMOVED***
            content: ""
       ***REMOVED***;
   ***REMOVED***

    componentDidMount() ***REMOVED***
        UserService.getModeratorBoard().then(
            response => ***REMOVED***
                this.setState(***REMOVED***
                    content: response.data
               ***REMOVED***);
           ***REMOVED***,
            error => ***REMOVED***
                this.setState(***REMOVED***
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
               ***REMOVED***);
           ***REMOVED***
        );
   ***REMOVED***

    render() ***REMOVED***
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>***REMOVED***this.state.content***REMOVED***</h3>
                </header>
            </div>
        );
   ***REMOVED***
***REMOVED***