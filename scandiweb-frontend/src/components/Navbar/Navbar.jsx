import { Component } from "react";

// Assets
import logo from "../../assets/logo.svg";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import './Navbar.scss'

// Components
import Tab from "./Tabs/Tab";
import CartModal from "./CartModal/CartModal";
import Skeleton from "../Skeleton/Skeleton";

// Redux
import { connect } from "react-redux";
import { categoriesLoaded, categoriesLoadingError, categorySelect } from "../../store/slices/category";

// Services
import api from "../../services";
import { toggleModal } from "../../store/slices/cart";

// Component
class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const { categories: categoriesData, onLoaded, onError } = this.props;

        if (categoriesData.length === 0) {
            const { http, categories } = api;
            const resp = await http(categories())
                .catch(error => onError(error.message));
    
    
            if (resp.data) onLoaded(resp.data.categories);
            if (resp.error) onError(resp.error.message);
        }
    }

    render() {
        const { loading, error, categories, activeCategoryIndex, onSelectCategory, reduxToggleModal, totalCartItemsAmount } = this.props;

        const tabs = categories.map((category, i) => {
            return (
                <Tab
                    key={category}
                    textContent={category}
                    index={i}
                    onClick={onSelectCategory}
                    isActive={i === activeCategoryIndex}
                />
            )
        })

        const skeletons = new Array(3).
            fill(null).
            map((_, i) => {
                return <Skeleton key={i} variant={"rect"} width={"70px"} height={"10px"} />
            });

        return (
            <nav className="navbar">
                <div className="navbar__tabs-wrapper">
                    {
                        loading ?
                            skeletons
                            :
                            tabs
                    }
                </div>
                <div className="navbar__logo-wrapper">
                    <img src={logo} alt="logo-icon" />
                </div>
                <div className="navbar__cart-wrapper">
                    <button data-testid='cart-btn' onClick={() => reduxToggleModal()} id="open-cart-btn" className="navbar__cart">
                        {totalCartItemsAmount ? <span data-testid="cart-count-bubble" className="navbar__cart_count">{totalCartItemsAmount}</span> : ""}
                        <CartIcon className="i-cart-black" />
                    </button>
                    <CartModal openCartBtn={"#open-cart-btn"} />
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => (
    {
        loading: state.category.loading,
        error: state.category.error,
        categories: state.category.data,
        activeCategoryIndex: state.category.active,

        totalCartItemsAmount: state.cart.totalItemsAmount
    }
);

const mapDispatchToProps = {
    onLoaded: categoriesLoaded,
    onError: categoriesLoadingError,
    onSelectCategory: categorySelect,

    reduxToggleModal: toggleModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
