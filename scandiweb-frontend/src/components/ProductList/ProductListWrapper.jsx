import { Component } from "react";

// Components
import ProductList from "./ProductList";

// Redux
import { connect } from "react-redux";
import { productsLoaded, productsLoadingError, productsLoadingStart } from "../../store/slices/product";

// Services
import api from "../../services";
import { productDetailsLoaded, productDetailsLoadingError, productDetailsLoadingStart, productDetailsLeavePage } from "../../store/slices/productDetails";
import { addProduct, toggleModal } from "../../store/slices/cart";


class ProductListWrapper extends Component {
    constructor(props) {
        super(props);

        this.onQuickShopClick = this.onQuickShopClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { activeCategoryIndex, products } = this.props;

        // Initially activeCategoryIndex is null, so when categories fetched it becomes '0' by default,
        // Initially produts array is empty, as the first category is 'all' we are fetching all products at one request and then just sorting what to display by activeCategoryIndex
        if (prevProps.activeCategoryIndex !== activeCategoryIndex && products.length === 0) {
            console.log('runned')
            this.fetchInitProduct();
        }
    }

    onQuickShopClick(e, productId) {
        e.preventDefault();

        const {
            products,
            productDetails,

            reduxToggleModal,
            reduxAddToCart,
            reduxProductDetailsLoaded,
            reduxProductDetailsErrored,
            reduxProductDetailsLeavePage
        } = this.props;

        const { price: { amount } } = products.find(product => product.id === productId);

        const cartData = {
            id: productId,
            price: amount,
            activeAttributes: []
        };

        // On quick-shop-button click we need to add product directly to the cart without opening the ProductDetails-page,
        // But we don't know anything about the attributes of the product, before ProductDetails-page opened,
        // since that, need to check if we have these details (maybe we ocasionaly opened PD page, so attrs are loaded), if not fetch and save it.
        if (productDetails[productId]) {
            reduxToggleModal();
            reduxAddToCart(cartData);
        } else {
            this.fetchProductDetails(productId)
                .then(resp => {
                    if (resp.data) reduxProductDetailsLoaded(resp.data.product);
                    if (resp.error) reduxProductDetailsErrored(resp.error);

                    reduxToggleModal();
                    reduxAddToCart(cartData);

                    // A bit abusive strategy using ProductDetailsLeavePage action:
                    // because since the ProductDetails-page behaivor in tuned to start always with 'loading: true' state,
                    // here where we fetch product details without opening the page itself, loading state needs to be reseted true
                    reduxProductDetailsLeavePage();
                });
        }

    }

    async fetchInitProduct() {
        const {
            categories,
            activeCategoryIndex,
            reduxProductLoadStart,
            reduxProductLoaded,
            reduxProductErrored
        } = this.props;

        reduxProductLoadStart();

        const { http, products } = api;
        const resp = await http(
            products(categories[activeCategoryIndex])
        );

        if (resp.data) reduxProductLoaded(resp.data.products);
        if (resp.error) reduxProductErrored(resp.error.message);
    }

    async fetchProductDetails(productId) {
        const {
            reduxProductDetailsLoadStart
        } = this.props;

        reduxProductDetailsLoadStart();

        const { http, productDetails } = api;

        return await http(
            productDetails(productId)
        );
    }

    render() {
        const { loading, categories, activeCategoryIndex, products } = this.props;

        return (
            <ProductList
                loading={loading}
                categories={categories}
                activeCategoryIndex={activeCategoryIndex}
                products={products}
                onQuickShopClick={this.onQuickShopClick}
            />
        )
    }
}

const mapStateToProps = (state) => (
    {
        loading: state.product.loading,
        error: state.product.error,
        products: state.product.data,

        categories: state.category.data,
        activeCategoryIndex: state.category.active,

        productDetails: state.productDetails.data
    }
);

const mapDispatchToProps = {
    reduxProductLoadStart: productsLoadingStart,
    reduxProductLoaded: productsLoaded,
    reduxProductErrored: productsLoadingError,

    reduxProductDetailsLoadStart: productDetailsLoadingStart,
    reduxProductDetailsLoaded: productDetailsLoaded,
    reduxProductDetailsErrored: productDetailsLoadingError,
    reduxProductDetailsLeavePage: productDetailsLeavePage,

    reduxToggleModal: toggleModal,
    reduxAddToCart: addProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListWrapper);

