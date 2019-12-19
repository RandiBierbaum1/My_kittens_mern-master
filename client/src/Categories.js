import React, {Component} from 'react';
import {Link} from "@reach/router";

class Categories extends Component {

    render() {
        let categoryList = <li>No Categories</li>

        if(this.props.data.length > 0) {
            categoryList = this.props.data.map(category =>
            <li key={category._id}>
                <Link to={`/category/${category._id}`}>{category.categoryName}</Link>
            </li>
            );
        }

        return (
            <React.Fragment>
                <div>
                    <ul>
                        {categoryList}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Categories;