// Component which implements Slider creation 

import { Component, createRef } from "react";

// Framework
import Slider from "../../../functions/framework/Slider/Slider"; // Slider class
import "../../../functions/framework/Slider/Slider.scss"; // Default Slider styles

// Assets
import "./CSlider.scss"; // Suppose to override default Slider appearance

// Helpers
import isArraysEqual from "../../../functions/helpers/isArraysEqual";

import img1 from "../../../assets/clothes/3.png";
import { ReactComponent as ArrowIcon } from "../../../assets/arrow.svg";
import img2 from "../../../assets/clothes/3.png";

class CSlider extends Component {
    constructor(props) {
        super(props);

        this.parent = createRef();
        this.navPrev = createRef();
        this.navNext = createRef();
        this.pagination = createRef();
    }

    componentDidMount() {

        new Slider(
            this.parent.current,
            this.navNext.current,
            this.navPrev.current,
            this.pagination.current,
            {
                pagImgs: this.props.gallery
            }
        );

    }

    imageLoadError(e) {
        e.target.parentElement.classList.add("img-load-error");
    }

    render() {
        const { gallery } = this.props;
        const isOneSlide = gallery.length === 1;

        return (
            <>
                <div
                    ref={this.parent}
                    id="product-details__slider"
                    className={`slider ${isOneSlide ? "oneSlide" : ""}`}
                >
                    <div onError={(e) => this.imageLoadError(e)} className="slider__main">
                        {
                            gallery.map((img, i) => {
                                return (
                                    <div key={i} className="slider__slide">
                                        <img src={img} alt="clothes" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button ref={this.navPrev} className="slider__btn-prev">
                        <ArrowIcon />
                    </button>
                    <button ref={this.navNext} className="slider__btn-next">
                        <ArrowIcon />
                    </button>

                </div>
                <div ref={this.pagination} className="slider__pagination"></div>
            </>
        )
    }
}

export default CSlider;