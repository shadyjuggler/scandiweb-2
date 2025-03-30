import { Component, createRef } from "react";

// Components
import CartItem from "./CartItem/CartItem";

// Assets
import "./CartModal.scss";

// Framework
import Modal from "../../../functions/framework/Modal/Modal";
import "../../../functions/framework/Modal/Modal.scss";

// Redux
import { connect } from "react-redux";
import cart, { toggleModal, updateTotalPrice, canPlaceOrder } from "../../../store/slices/cart";

// Services
import api from "../../../services";


class CartModal extends Component {
    constructor(props) {
        super(props);
        this.parent = createRef();
        this.modalInstance = createRef();
        this.overlay = createRef();
    }

    componentDidMount() {
        const { reduxToggleModal } = this.props;
        const overlaySel = "cart-modal-overlay";

        const modal = new Modal(
            this.parent.current,
            this.props.openCartBtn,
            {
                overlay: overlaySel
            }
        )

        this.modalInstance.current = modal;
        this.overlay.current = document.querySelector(`#${overlaySel}`).addEventListener("click", () => reduxToggleModal());
    }

    componentDidUpdate(prevProps) {
        const { isModalOpen, totalItemsAmount, reduxUpdateTotalPrice, reduxCanPlaceOrder, allowedToPlaceOrder } = this.props;
        if (prevProps.isModalOpen !== isModalOpen) {
            this.modalInstance.current.toggleModalState();
        }

        if (prevProps.totalItemsAmount !== totalItemsAmount) {
            reduxUpdateTotalPrice();

            // Checks only corner cases when we need to restrict placing order
            if (prevProps.totalItemsAmount === 0 && totalItemsAmount > 0) {
                reduxCanPlaceOrder(true)
            }
            if (totalItemsAmount == 0) {
                reduxCanPlaceOrder(false)
            }
        }

    }

    onPlaceOrderClick() {
        const { cartData, totalItemsAmount, totalPrice, productDetails } = this.props;
        const cartDataArr = Object.keys(cartData);

        const itemsData = cartDataArr.map((cartItemId) => {
            const { id, price, amount, activeAttributes } = cartData[cartItemId];
            const attributes = productDetails[id].attributes;

            const selectedAttributes = [...activeAttributes];

            if (activeAttributes.length === 0) {
                for (let i = 0; i < attributes.length; i++) {
                    selectedAttributes.push(0);
                }
            }

            return (
                {
                    id,
                    price,
                    amount,
                    options: attributes.map((attr, i) => {
                        console.log(attr.items);
                        return `${attr.name}: ${attr.items[selectedAttributes[i]].value}`
                    })
                }
            )
        })

        const order = {
            total_price: totalPrice,
            total_items: totalItemsAmount,
            items_data: JSON.stringify(itemsData)
        }

        this.fetch(order)
    }

    async fetch(order) {
        // const { reduxLoaded, reduxErrored } = this.props;
        const { http, addProduct } = api;
        const resp = await http(
            addProduct(order)
        );
        console.log(resp);
    }

    render() {
        const { cartData, initProductData, productDetails, totalItemsAmount, totalPrice, allowedToPlaceOrder } = this.props;
        const cartDataArr = Object.keys(cartData);

        return (
            <div ref={this.parent} className="modal cart-modal">
                <p className="cart-modal__count">
                    <span>My Bag</span>,
                    {
                        totalItemsAmount !== 0 ?
                            ` ${totalItemsAmount} item${totalItemsAmount === 1 ? "" : "s"}`
                            :
                            " 0 items"
                    }
                </p>
                <div className="cart-modal__wrapper">
                    {
                        initProductData.length === 0 ?
                            <p>Initial product data id loading...</p>
                            :
                            cartDataArr.map(id => {
                                const { id: productId, amount: cartItemAmount } = cartData[id];
                                const { name, thumbnail, price: { amount: priceAmount, currency: { symbol } } } = initProductData.find(product => product.id === productId);
                                const { attributes: cartItemAttr } = productDetails[productId];
                                
                                return (
                                    <CartItem
                                        cartItemId={id}
                                        key={id}
                                        name={name}
                                        price={`${symbol}${priceAmount}`}
                                        attributes={cartItemAttr}
                                        amount={cartItemAmount}
                                        img={thumbnail}
                                    />
                                )
                            })
                    }
                </div>

                <div className="cart-modal__total">
                    <p className="cart-modal__total-text">Total</p>
                    <p data-testid='cart-total' className="cart-modal__total-value">{`$ ${totalPrice.toFixed(2)}`}</p>
                </div>
                <button data-testid="place-order-btn" onClick={() => this.onPlaceOrderClick()} disabled={!allowedToPlaceOrder} className="cart-modal__order-btn button-submit">place order</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        isModalOpen: state.cart.isOpened,
        cartData: state.cart.data,
        totalItemsAmount: state.cart.totalItemsAmount,
        totalPrice: state.cart.totalPrice,
        allowedToPlaceOrder: state.cart.allowedToPlaceOrder,

        initProductData: state.product.data,
        productDetails: state.productDetails.data
    }
);

const mapDispatchToProps = {
    reduxToggleModal: toggleModal,
    reduxUpdateTotalPrice: updateTotalPrice,
    reduxCanPlaceOrder: canPlaceOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);