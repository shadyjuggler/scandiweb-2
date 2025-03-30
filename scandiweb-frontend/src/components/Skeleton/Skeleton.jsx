import { Component } from "react";

// Assests
import "./Skeleton.scss";

class Skeleton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: "0"
        }
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({
                opacity: "1"
            });
        }, 200); 
    }

    render() {

        const { variant, width, height, margin } = this.props;
        return (
            <div className={`skeleton ${variant}`}
                style={
                    {
                        opacity: this.state.opacity,
                        width: width ? width : "auto",
                        height: height ? height : "auto",
                        margin: margin ? margin : "5px"
                    }
                }
            ></div>
        )
    }
}

export default Skeleton;