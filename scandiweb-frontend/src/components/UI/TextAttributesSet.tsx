import { useState } from "react";
import { AttributeSetProps } from "../Interfaces/AttributeSetProps";

export const TextAttributesSet: React.FC<AttributeSetProps> = ({
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
        <div className={`${isSmall && "small"} flex gap-3`}>
            {attributeSetItems.map((attribute, i) => {
                return (
                    <span
                        key={attribute.id}
                        onClick={() => onClick(i, attribute.displayValue)}
                        className={`attribute-text ${active === i && "attribute-text_active"}`}
                    >
                        <p className="sourcesanspro">
                            {attribute.value} 
                        </p>
                    </span>
                );
            })}
        </div>
    );
};
