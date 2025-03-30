import { Component } from "react";

import { Link } from "react-router-dom";

import "./Tab.scss";

class Tab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { textContent, isActive, index, onClick } = this.props;
        return (
            <Link data-testid={isActive ? "active-category-link" : "category-link"} to={`/${textContent}`} onClick={() => onClick(index)} className={`tab-item ${isActive && "tab-item_active"}`}>{textContent}</Link>
        )
    }
}

export default Tab;