import { Component } from "react";

import { Link } from "react-router-dom";

// Assets
import "./Product.scss";
import { ReactComponent as CartIcon } from "../../../assets/cart.svg";

//Redux
import { connect } from "react-redux";
import { productDetailsLoadingStart, setProductId } from "../../../store/slices/productDetails";

class Product extends Component {
    constructor(props) {
        super(props);
    }

    onProductClick(id) {
        const { reduxSetActiveProduct } = this.props;
        reduxSetActiveProduct(id);
    }

    render() {
        const {
            id,
            name,
            thumbnail: img,
            in_stock: isInStock,
            discount,
            price: {
                amount,
                currency: { symbol }
            },
        } = this.props.productData;

        const { onQuickShopClick } = this.props;

        return (
            <Link
                to={`/${id}`}
                data-testid={`product-${name.toLowerCase().split(" ").join("-")}`}
                onClick={() => this.onProductClick(id)}
                className={`product ${!isInStock && "product_notInStock"}`}
            >
                <div className="product__img" style={{ background: `url(${img})` }}>
                    <h1>{discount}</h1>
                    <button
                        onClick={(e) => onQuickShopClick(e, id)}
                        className="product__quick-shop"
                        type="button"
                    >
                        <CartIcon className="i-cart-white" />
                    </button>
                </div>
                <div className="product__name">{name}</div>
                <div className="product__price">{`${symbol}${amount}`}</div>
            </Link >
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    reduxSetActiveProduct: setProductId
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
