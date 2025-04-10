import { useState } from "react";
import { AttributeSetProps } from "../Interfaces/AttributeSetProps";
import { TextAttributesSet } from "./TextAttributesSet";
import { SwatchAttributesSet } from "./SwatchAttributesSet";

export const AttributeSet: React.FC<AttributeSetProps> = ({
    defaultActiveAttributeIndex = 0,
    isSmall = false,
    items,
    productSelectedAttributes,
    onSelect,
    orderIndex,
    type,
}) => {
    const [activeAttributeIndex, setActiveAttributeIndex] = useState<number>(defaultActiveAttributeIndex);

    const onClick = (index: number) => {
        setActiveAttributeIndex(index);

        if (
            onSelect &&
            productSelectedAttributes &&
            typeof orderIndex !== "undefined"
        ) {
            const updated = [...productSelectedAttributes];
            updated[orderIndex] = index;
            onSelect(updated);
        }
    };

    if (!type) {
        return <p className="text-semibold">No attribute set type provided</p>;
    }

    if (!items) {
        return <p className="text-semibold">No attribute items provided</p>;
    }

    const renderProps = {
        active: activeAttributeIndex,
        items,
        onClick,
        isSmall,
    };

    switch (type) {
        case "text":
            return <TextAttributesSet {...renderProps} />;
        case "swatch":
            return <SwatchAttributesSet {...renderProps} />;
        default:
            return (
                <p className="text-semibold">
                    Attribute set type not recognized!
                </p>
            );
    }
};
