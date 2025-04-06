import { useState } from "react";
import { AttributeSetProps } from "../Interfaces/AttributeSetProps";

export const TextAttributesSet: React.FC<AttributeSetProps> = ({
    isSmall = false,
    items,
    onSelect,
}) => {
    const [active, setActive] = useState<number>(0);

    const onClick = (index: number, value: string) => {
        setActive(index);
        if (onSelect) onSelect(value);
    };

    // Items could be undefined, becuae Partial type was used on AttributeSetType to make AttributeSetProps
    if (!items) {
        return <p className="text-semibold">No attribute items provided</p>
    }

    return (
        <div className={`${isSmall && "small"} flex gap-3`}>
            {items?.map((attribute, i) => {
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
