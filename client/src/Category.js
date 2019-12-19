import React, {Component} from 'react';
import {Link} from "@reach/router";

class Category extends Component {

    render() {
        const category = this.props.loadCategory(this.props.id);

        return (
            <React.Fragment>
                <h2>{category.categoryName}</h2>


                <ul>
                    {category.books.map(book =>
                        <li><Link to={`/book/${book._id}`}>{book.title}</Link>

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
                        </li>
                    )}

                </ul>
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

export default Category;