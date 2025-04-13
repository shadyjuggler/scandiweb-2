import { RenderAttributeSetProps } from "../../Interfaces";

export const TextAttributesSet: React.FC<RenderAttributeSetProps> = ({
    attribute_id,
    isSmall = false,
    items,
    selectedAttributeItems,
    onClick,
}) => {

    return (
        <div className={`${isSmall && "small"} flex gap-3`}>
            {items?.map((attributeItem) => {
                return (
                    <span
                        key={attributeItem.attribute_item_id}
                        onClick={() => onClick(attributeItem.attribute_item_id)}
                        className={`attribute-text ${
                            selectedAttributeItems[attribute_id ?? 0] ===
                                attributeItem.attribute_item_id &&
                            "attribute-text_active"
                        }`}
                    >
                        <p className="sourcesanspro">{attributeItem.value}</p>
                    </span>
                );
            })}
        </div>
    );
};
