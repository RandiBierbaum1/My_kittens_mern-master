import React, {Component} from 'react';
import {Link} from "@reach/router";

class Book extends Component {

    render() {
        const book = this.props.loadBook(this.props.id);
        let content = <p>Page is loading...</p>;

        if(book) {
            content = book.books ?
                book.books.map(
                    book =>
                        <ul key={book._id}>
                            <div key={book._id} className="colums">
                                <h4>{book.title}</h4>
                                <ol>
                                    <ul>Author: {book.author}</ul>
                                    <ul>Price in dkk: {book.price}</ul>
                                    <ul>Seller:</ul>
                                    <ol>
                                        <ul>Name: {book.nameOfSeller}</ul>
                                        <ul>Email: {book.emailOfSeller}</ul>
                                    </ol>
                                </ol>
                                <br/>
                            </div>
                        </ul>
                )
                : [];
        }
        return (
            <React.Fragment>
                <ul>{content}</ul>
                <ul>{book.title}</ul>
                <br/>

                <Link to="/">
                    <button type="button">
                        Go Back
                    </button>
                </Link>
            </React.Fragment>
        );
    }
}

export default Book;