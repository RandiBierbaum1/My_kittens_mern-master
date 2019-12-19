import React, {Component} from 'react';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleLogin(event) {
        event.preventDefault();
        await this.props.login(this.state.username, this.state.password);
    }


    render() {
        return (
            <>
                <form>
                    <div className="field">
                        <label htmlFor="Username">Username</label>
                        <input onChange={event => this.onChange(event)}
                               type="text"
                               placeholder="Username"
                               name="username"/>
                        <br/>
                        <label htmlFor="Password">Password</label>
                        <input onChange={event => this.onChange(event)}
                               type="password"
                               placeholder="Password"
                               name="password"/>
                        <br/>
                        <br/>
                        <button onClick={e => this.handleLogin(e)}>Login</button>
                    </div>

                </form>
            </>
        )
    };
}