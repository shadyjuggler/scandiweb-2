import { useState } from "react";
import { AttributesSetProps } from "../Interfaces/AttributesSetProps";

export const SwatchAttributesSet: React.FC<AttributesSetProps> = ({
    data,
    onSelect,
}) => {
    const [active, setActive] = useState<number>(0);

    const onClick = (index: number, value: string) => {
        setActive(index);
        if (onSelect) onSelect(value);
    };

    return (
        <div className="flex gap-2">
            {data.map((attribute, i) => {
                return (
                    <span
                        key={attribute.id}
                        onClick={() => onClick(i, attribute.displayValue)}
                        className={`attribute-swatch ${
                            active === i && "attribute-swatch_active"
                        }`}
                        style={{backgroundColor: `${attribute.value}`}}
                    ></span>
                );
            })}
        </div>
    );
};
