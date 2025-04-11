import { RenderAttributeSetProps } from "../../Interfaces";

export const TextAttributesSet: React.FC<RenderAttributeSetProps> = ({
    isSmall = false,
    items,
    onClick,
    active,
}) => {
    return (
        <div className={`${isSmall && "small"} flex gap-3`}>
            {items?.map((attribute, i) => {
                return (
                    <span
                        key={attribute.id}
                        onClick={() => onClick(i)}
                        className={`attribute-text ${
                            active === i && "attribute-text_active"
                        }`}
                    >
                        <p className="sourcesanspro">{attribute.value}</p>
                    </span>
                );
            })}
        </div>
    );
};
