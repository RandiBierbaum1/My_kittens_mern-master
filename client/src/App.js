import React, {Component} from 'react';
import {Router} from "@reach/router";
import {Link} from "@reach/router";

import Category from "./Category";
import Categories from "./Categories";
import Book from "./Book";
import PostBook from "./PostBook";
import Login from "./Login";
import Admin from "./Admin";
import AuthService from "./AuthService";

class App extends Component {
    API_URL = 'http://localhost:8080/api';

    constructor(props) {
        super(props);

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
        this.state = {
            data : []
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await this.Auth.fetch(`${this.API_URL}/categories`);
        const json = await response.json();
        this.setState({data: json});
    }

    getCategory(id) {
        return this.state.data.find(category => category._id === id);
    }

    createCategory(id, categoryName) {
        const url = `${this.API_URL}/categories`;
        this.Auth.fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                categoryName: categoryName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("New category added");
                this.getData();
            });

    }

    deleteCategory(id) {
        const url = `${this.API_URL}/categories/category/${id}`;
        this.Auth.fetch(url, {
            method: 'DELETE'}).then(() => {
            this.getData();
        });
    }

    getBook(id) {
        return this.state.data.map(x => x.books).find(b => b._id === id);
    }

    postBook(id, title, author, price, nameOfSeller, emailOfSeller) {
        const url = `${this.API_URL}/categories/` + id+'/books';
        this.Auth.fetch(url,{
            method: 'POST',
            body: JSON.stringify({
                title: title,
                author: author,
                price: price,
                nameOfSeller: nameOfSeller,
                emailOfSeller: emailOfSeller
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("New Answer added");
                this.getData();
            });
    }


    async login(username, password) {
        try {
            const resp = await this.Auth.login(username, password);
            console.log("Authentication:", resp.msg);
            this.getData();
        } catch (e) {
            console.log("Login", e);
        }
    }

    async logout(event) {
        event.preventDefault();
        this.Auth.logout();
        await this.setState({
            userCredentials: {},
            data: []
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    {this.Auth.getUsername() ?
                        <small>Logged in: {this.Auth.getUsername()}. <button
                            onClick={(event) => {this.logout(event)}}>Logout.</button></small>
                        : <Login login={(username, password) => this.login(username, password)}/>}
                </div>

                <section className="hero is-primary">
                    <Link to="/"><h1>Secondhand Book Store</h1></Link>
                </section>

                <br/>
                <div>
                    <Link to="/admin">Admin</Link>
                </div>
                <br/>
                <div>
                    <Link to="/postBook">
                        <button type="button">
                            Add new book
                        </button>
                    </Link>
                </div>


                <Router>
                    <Categories path="/"
                                categories={this.props.categories}
                                data={this.state.data}
                    />

                    <Category path="/category/:id"
                              loadCategory={(id) => this.getCategory(id)}
                    />

                    <Book path="/book/:id"
                          loadBook={(id) => this.getBook(id)}
                    />

                    <PostBook path="/postBook" data={this.state.data}
                              postBook={(id, title, author, price, nameOfSeller, emailOfSeller) =>
                                  this.postBook(id, title, author, price, nameOfSeller, emailOfSeller)}
                    />

                    <Login path="/login"
                           login={(username, password) => this.props.login(username, password)}
                    />

                    <Admin path="/admin"
                           data={this.state.data}
                           deleteCategory={(id) => this.deleteCategory(id)}
                           createCategory={(id, categoryName) => this.createCategory(id, categoryName)}
                    />

                </Router>
            </React.Fragment>
        )
    }
}

export default App;