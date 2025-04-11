import { RenderAttributeSetProps } from "../../Interfaces";

export const SwatchAttributesSet: React.FC<RenderAttributeSetProps> = ({
    isSmall = false,
    items,
    onClick,
    active
}) => {
    return (
        <div className={`${isSmall && "small"} flex gap-2`}>
            {items?.map((attribute, index) => {
                return (
                    <span
                        key={attribute.id}
                        onClick={() => onClick(index)}
                        className={`attribute-swatch ${
                            active === index && "attribute-swatch_active"
                        }`}
                        style={{ backgroundColor: `${attribute.value}` }}
                    ></span>
                );
            })}
        </div>
    );
};
