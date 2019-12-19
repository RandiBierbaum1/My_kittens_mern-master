import React, {Component} from 'react';
import {Link} from "@reach/router";

class Header extends Component {
    render() {
        const loginStatus = () => {
            if (this.props.username) {
                return (
                    <React.Fragment>
                        Welcome {this.props.username}.
                        <button className="button is-small" onClick={
                            (event) => this.props.logout(event)}>logout</button>
                    </React.Fragment>)
            } else {
                return <Link to="/login" className="btnText">Login</Link>
            }
        };

        return (
                <div>
                    {loginStatus()}
                </div>
        );
    }
}
export default Header;