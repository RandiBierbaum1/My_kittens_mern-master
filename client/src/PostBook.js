import React, {Component} from 'react';
import {Link} from "@reach/router";

class PostBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            author: "",
            price: 0,
            nameOfSeller: "",
            emailOfSeller: ""
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data.length > 0 && !state.categoryId) {
            return { categoryId: props.data[0]._id }
        }
        return state;
    }

    onClick(event) {
        this.props.postBook(
            this.state.categoryId,
            this.state.title,
            this.state.author,
            this.state.price,
            this.state.nameOfSeller,
            this.state.emailOfSeller
        );
    }

    render() {
        let categoryList = <li>Empty</li>

        if(this.props.data) {
            categoryList = this.props.data.map(category =>
                <option key={category._id} value={category._id}>
                    {category.categoryName}
                </option>
            );
        }

        return (
            <React.Fragment>
                <form>
                    <div className="field">
                        <label className="label" htmlFor="bookInput">Enter book info</label>
                        <div className="control">
                            <ol>
                                <label htmlFor="title">Book title</label>
                                <input onChange={e => this.setState({title: e.target.value})}
                                       type="text" id="title" name="title"/><br/>

                                <label htmlFor="author">Author</label>
                                <input onChange={e => this.setState({author: e.target.value})}
                                       type="text" id="autor" name="author"/><br/>

                                <label htmlFor="price">Price</label>
                                <input onChange={e => this.setState({price: e.target.value})}
                                       type="number" id="price" name="price"/><br/>

                                <label htmlFor="nameOfSeller">Your name</label>
                                <input onChange={e => this.setState({nameOfSeller: e.target.value})}
                                       type="text" id="nameOfSeller" name="nameOfSeller"/><br/>

                                <label htmlFor="emailOfSeller">Your email</label>
                                <input onChange={e => this.setState({emailOfSeller: e.target.value})}
                                       type="email" id="emailOfSeller" name="emailOfSeller"/><br/>

                                <label htmlFor="category">Category</label>
                                <select onChange={e => this.setState({categoryId: e.target.value})} value={this.state.categoryId}>
                                    {categoryList}
                                </select>

                            </ol>
                        </div>
                    </div>
                    <div className="field">
                        <button onClick={() => this.onClick()} type="submit" id="PostBook">
                            Add book
                        </button>
                    </div>
                </form>

                <Link to="/">
                    <button type="button">
                        Go Back
                    </button>
                </Link>
            </React.Fragment>
        )
    };
}

export default PostBook;
