import { Component } from "react";

// Components
import ProductDetails from "./ProductDetails";

// Redux 
import { connect } from "react-redux";
import { productDetailsLoadingStart, productDetailsLoaded, productDetailsLoadingError, productDetailsLeavePage } from "../../store/slices/productDetails";
import { toggleModal, addProduct } from "../../store/slices/cart";

// Services
import api from "../../services";

// Helpers
import isArraysEqual from "../../functions/helpers/isArraysEqual";

class ProductDetailsWrapper extends Component {
    constructor(props) {
        super(props);

        this.onAddToCartClick = this.onAddToCartClick.bind(this);
    }

    componentDidMount() {
        if (!this.props.initProductData) return;//to remove, happens when refresh page on ProductDetails because products not loaded due ProductList never rendered yet.

        const { productId, productDetails, reduxLoaded } = this.props;

        // Component Always starts with loading: true, if 'details' already fetched, dispatch 'loaded' action  
        if (productDetails) {
            reduxLoaded();
        } else {
            this.fetch(productId);
        }
    }

    componentWillUnmount() {
        const { reduxLeavePage } = this.props;
        reduxLeavePage();
    }

    async fetch(productId) {
        const { reduxLoaded, reduxErrored } = this.props;

        this.props.reduxLoadStart();

        const { http, productDetails } = api;
        const resp = await http(
            productDetails(productId)
        );

        if (resp.data) reduxLoaded(resp.data.product);
        if (resp.error) reduxErrored(resp.error);
    }

    onAddToCartClick() {
        const { initProductData: { id, price: { amount } }, productDetails, reduxToggleModal, reduxAddTocart } = this.props;
        const { activeAttributes } = productDetails ? productDetails : {};

        const cartData = {
            id,
            price: amount,
            activeAttributes
        }

        reduxToggleModal();
        reduxAddTocart(cartData);
    }


    render() {
        if (!this.props.initProductData) return; //to remove, happens when refresh page on ProductDetails because products not loaded due ProductList never rendered yet.

        const { loading, error, initProductData, productDetails } = this.props;

        return (
            <ProductDetails
                loading={loading}
                error={error}

                initProductData={initProductData}
                productDetails={productDetails}

                onAddToCartClick={this.onAddToCartClick}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const productId = state.productDetails.productId;
    return {
        productId,
        initProductData: state.product.data.find(product => product.id === productId),

        loading: state.productDetails.loading,
        error: state.productDetails.error,
        productDetails: state.productDetails.data[productId]
    }
};

const mapDispatchToProps = {
    reduxLoadStart: productDetailsLoadingStart,
    reduxLoaded: productDetailsLoaded,
    reduxErrored: productDetailsLoadingError,
    reduxLeavePage: productDetailsLeavePage,
    reduxAddTocart: addProduct,
    reduxToggleModal: toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsWrapper);