import { Component } from "react";

import "./Option.scss";

// Helpers
import sizeValidation from "../../../functions/helpers/sizeValidation";

// Redux
import { connect } from "react-redux";
import { setActiveAttribute, checkAllAttrForBeSelected } from "../../../store/slices/productDetails";

// Option component is used in ProductDetails and CartModal, props: styleType determine that (if provided => in CartMoal opton)
//                                                                                           (if null => in ProductDetails opton)
// in ProductDetails it's clickable
// in CartModal it's not

class Option extends Component {

    constructor(props) {
        super(props);
    }

    onAttributeClick(attributeIndex, attributeValue) {
        const { productId, reduxSetActiveAttr, reduxCheckAllAttr } = this.props;

        reduxSetActiveAttr({
            productId,
            attributeIndex,
            attributeValue
        })
        reduxCheckAllAttr({ productId });
    }

    render() {
        const { index, name, type: optionType, items: optionItems, className, activeAttributes } = this.props;

        return (
            <div className={className}>
                <p className="product-details__subtitle">{`${name}:`}</p>

                {/* id: optionType = 'color' has unique styling, all other 'optionType' value will have default styles */}
                <div data-testid={`product-attribute-${name.toLowerCase().split(" ").join("")}`} data-option={optionType} className={`option`}>
                    {
                        optionItems.map((item, i) => {
                            const { displayValue, value } = item;

                            const activeAttributeValueIndex = activeAttributes[index];


                            return (
                                <div key={i} onClick={() => this.onAttributeClick(index, i)}>
                                    {
                                        <span
                                            data-testid={`product-attribute-${name.toLowerCase().split(" ").join("")}-${displayValue}`}
                                            className={`option__item ${activeAttributeValueIndex === i && "option__item_active"}`}
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

const mapStateToProps = (state) => {
    const productId = state.productDetails.productId || null;
    let activeAttributes = []
    if (productId) {
        activeAttributes = state.productDetails.data[productId].activeAttributes;
    }
    return {
        productId,
        activeAttributes
    }
};

const mapDispatchToProps = {
    reduxSetActiveAttr: setActiveAttribute,
    reduxCheckAllAttr: checkAllAttrForBeSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(Option);
