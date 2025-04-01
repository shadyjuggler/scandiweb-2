import { Component } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

class BaseLayout extends Component {
    render() {
        return (
            <div className="container">
                <Navbar/>
                <Outlet/>
            </div>
        )
    }
}

export default BaseLayout;