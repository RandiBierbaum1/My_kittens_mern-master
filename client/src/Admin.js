import React, {Component} from 'react';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }

    onClick(event) {
        this.props.createCategory(
            this.props.id,
            this.state.input
        );
    }

    render() {
        let categoryList = <li>Empty</li>

        if(this.props.data) {
            categoryList = this.props.data.map(category =>
                <li key={category._id} >
                    {category.categoryName}
                    <button onClick={
                        () => this.props.deleteCategory(category._id)}>Delete
                    </button>
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
                <div>
                    <input onChange={e => this.setState({input: e.target.value})}
                           type="text" id="input" name="categoryInput"/><br/>
                </div>
                <div className="field">
                    <button onClick={() => this.onClick()} type="submit" id="PostCategory">
                        Create Category
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default Admin;