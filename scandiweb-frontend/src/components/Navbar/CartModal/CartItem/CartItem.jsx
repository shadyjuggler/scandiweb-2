import { Component } from "react";

// Components
import CartOption from "../CartOption/CartOption";

// Assets
import "./CartItem.scss";
import { ReactComponent as MinusIcon } from "../../../../assets/minus.svg";

// Redux
import { connect } from "react-redux";
import { changeAmount } from "../../../../store/slices/cart";

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { cartItemId, name, amount, price, attributes, img, changeAmount } = this.props;
        console.log(attributes)
        return (
            <div className="cart-item">
                <div className="cart-item__options">
                    <p className="cart-item__name">{name}</p>
                    <p className="cart-item__price">{price}</p>
                    {
                        attributes.map(({ id, name, type, items }, i) => (
                            <CartOption
                                cartItemId={cartItemId}
                                key={id}
                                index={i}
                                name={name}
                                type={type}
                                items={items}
                                className={"cart-item__option"}
                            />
                        ))
                    }
                </div>
                <div className="cart-item__count-wrapper">
                    <button data-testid='cart-item-amount-increase' onClick={() => changeAmount({cartItemId, value: 1})} className="cart-item__count-btn">
                        +
                    </button>
                    <p data-testid='cart-item-amount' className="cart-item__count">{amount}</p>
                    <button data-testid='cart-item-amount-decrease' onClick={() => changeAmount({cartItemId, value: -1})} className="cart-item__count-btn">
                        <MinusIcon />
                    </button>
                </div>
                <div className="cart-item__img" style={{ backgroundImage: `url(${img})` }}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {

    }
);

const mapDispatchToProps = {
    changeAmount: changeAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
