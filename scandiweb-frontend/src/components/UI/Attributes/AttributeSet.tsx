import { AttributeSetProps } from "../../Interfaces";
import { TextAttributesSet } from "./TextAttributesSet";
import { SwatchAttributesSet } from "./SwatchAttributesSet";

import { useRuntime } from "../../../context/RuntimeContext";

export const AttributeSet: React.FC<AttributeSetProps> = ({
    attribute_id,
    isSmall = false,
    items,
    selectedAttributeItems,
    type,
}) => {
    const { updateSelectedAttributeItems } =
        useRuntime();

    const onClick = (attribute_item_id: number) => {
        if (!attribute_id) return;
        updateSelectedAttributeItems(attribute_id, attribute_item_id);
    };

    if (!type) {
        return <p className="text-semibold">No attribute set type provided</p>;
    }

    if (!items) {
        return <p className="text-semibold">No attribute items provided</p>;
    }

    const renderProps = {
        items,
        onClick,
        isSmall,
        selectedAttributeItems
    };

    switch (type) {
        case "text":
            return (
                <TextAttributesSet
                    attribute_id={attribute_id}
                    {...renderProps}
                />
            );
        case "swatch":
            return (
                <SwatchAttributesSet
                    attribute_id={attribute_id}
                    {...renderProps}
                />
            );
        default:
            return (
                <p className="text-semibold">
                    Attribute set type not recognized!
                </p>
            );
    }
};
