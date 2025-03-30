import { Component } from "react";

// Assets
import "./ProductDetails.scss"

// Components
import CSlider from "./CSlider/CSlider";
import Option from "./Option/Option";
import Skeleton from "../Skeleton/Skeleton";
import SafeHtml from "../SafeHTML/SafeHtml";


class ProductDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {
            loading,
            error,
            initProductData: {
                name,
                in_stock: isInStock,
                price: {
                    amount,
                    currency: {
                        symbol
                    }
                }
            },
            onAddToCartClick
        } = this.props;

        const {
            gallery,
            attributes,
            description,
            canAddToCart
        } = loading ? {} : this.props.productDetails;


        const sliderSkeleton = (
            <div className="slider-skeleton">
                <div>
                    {new Array(5).fill(null).map((_, i) => <Skeleton variant={"rect"} key={i} margin="0px" width="80px" height="80px" />)}
                </div>
                <Skeleton variant={"rect"} margin="0px" width="575px" height="100%" />
            </div>
        );


        const attrSkeleton = (
            <div className="attr-skeleton">
                <Skeleton variant={"rect"} margin="0px" width="100px" height="22px" />
                <div>
                    {new Array(4).fill(null).map((_, i) => <Skeleton variant={"rect"} key={i} margin="0px" width="60px" height="100%" />)}
                </div>
            </div>
        )

        const descrSkeleton = new Array(6).fill(null).map((_, i) => <Skeleton variant={"rect"} key={i} margin="5px 0px 0px 0px" height="16px" />)

        return (
            <div className="product-details">

                <div data-testid='product-gallery' className="product-details__slider-wrapper">
                    {
                        loading ?
                            sliderSkeleton
                            :
                            <CSlider  gallery={gallery} />
                    }
                </div>

                <div className="product-details__actions-wrapper">
                    <p className="product-details__name">{name}</p>
                    <div className="product-details__actions">

                        {
                            loading ?
                                attrSkeleton
                                :
                                attributes.map(({ id, name, type, items }, i) => {
                                    return (
                                        <Option
                                            key={id}
                                            index={i}
                                            name={name}
                                            type={type}
                                            styleType={"product-details__option"}
                                            className={"product-details__action"}
                                            items={items}
                                        />
                                    )
                                })
                        }

                        <div className="product-details__action">
                            <p className="product-details__subtitle">PRICE:</p>
                            <div className="product-details__price">
                                <p className="product-details__price-value">{`${symbol}${amount}`}</p>
                            </div>
                        </div>

                        <button data-testid='add-to-cart' onClick={() => onAddToCartClick()}
                            className="product-details__button button-submit"
                            disabled={isInStock ? !canAddToCart : true}>
                            add to cart
                        </button>

                        <p data-testid='product-description' className="product-details__descr">{
                            loading ?
                                descrSkeleton
                                :
                                <SafeHtml htmlContent={description} />
                        }</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails;