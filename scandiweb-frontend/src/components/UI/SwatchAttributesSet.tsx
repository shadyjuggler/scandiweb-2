import { useState } from "react";
import { AttributeSetProps } from "../Interfaces/AttributeSetProps";

export const SwatchAttributesSet: React.FC<AttributeSetProps> = ({
    isSmall = false,
    attributeSetItems,
    onSelect,
}) => {
    const [active, setActive] = useState<number>(0);

    const onClick = (index: number, value: string) => {
        setActive(index);
        if (onSelect) onSelect(value);
    };

    return (
        <div className={`${isSmall && "small"} flex gap-2`}>
            {attributeSetItems.map((attribute, i) => {
                return (
                    <span
                        key={attribute.id}
                        onClick={() => onClick(i, attribute.displayValue)}
                        className={`attribute-swatch ${
                            active === i && "attribute-swatch_active"
                        }`}
                        style={{ backgroundColor: `${attribute.value}` }}
                    ></span>
                );
            })}
        </div>
    );
};
