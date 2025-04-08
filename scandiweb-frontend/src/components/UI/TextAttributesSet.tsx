import { AttributeType } from "../../types";

interface SwatchAttributeSet {
    active: number;
    isSmall: boolean;
    items: AttributeType[];
    onClick: (index: number) => void;
}

export const TextAttributesSet: React.FC<SwatchAttributeSet> = ({
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
