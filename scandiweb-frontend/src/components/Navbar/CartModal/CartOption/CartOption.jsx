import { act, Component } from "react";

// Assets
import "./CartOption.scss";

// Helpers
import sizeValidation from "../../../../functions/helpers/sizeValidation";

// Redux
import { connect } from "react-redux";

class CartOption extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { cartItemId, index, name, type: optionType, items: optionItems, className, cartActiveAttributes } = this.props;

        const {activeAttributes} = cartActiveAttributes[cartItemId];

        return (
            <div className={className}>
                <p className="cart-item__subtitle">{`${name}:`}</p>

                {/* id: optionType = 'swatch' has unique styling, all other 'optionType' value will have default styles */}
                <div data-testid={`cart-item-attribute-${name.toLowerCase().split(" ").join("-")}`} data-option={optionType} className={`option cart-option`}>
                    {
                        optionItems.map((item, i) => {
                            const { displayValue, value } = item;

                            // If active attributes has no values => mean's that product was added from product list through quick shop button
                            const activeAttribute = activeAttributes[index] ? activeAttributes[index] : 0;

                            return (
                                <div  key={i}>
                                    {
                                        <span
                                            data-testid={`cart-item-attribute-${name.toLowerCase().split(" ").join("-")}-${displayValue.split(" ").join("-")}${activeAttribute === i ? '-selected' : ''}`}
                                            className={`option__item ${activeAttribute === i && "option__item_active"}`}
                                            value={optionType === "swatch" ? value : displayValue}
                                            style={optionType === "swatch" ? { backgroundColor: value } : {}}
                                        >
                                            {optionType === "swatch" ? "" : sizeValidation(displayValue)}
                                        </span>
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        cartActiveAttributes: state.cart.data,
    }
);

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CartOption);
