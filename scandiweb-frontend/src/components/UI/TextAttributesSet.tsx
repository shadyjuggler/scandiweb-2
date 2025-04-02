import { useState } from "react";
import { AttributesSetProps } from "../Interfaces/AttributesSetProps";

export const TextAttributesSet: React.FC<AttributesSetProps> = ({
    data,
    onSelect,
}) => {
    const [active, setActive] = useState<number>(0);

    const onClick = (index: number, value: string) => {
        setActive(index);
        if (onSelect) onSelect(value);
    };

    return (
        <div className="flex gap-3">
            {data.map((attribute, i) => {
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
