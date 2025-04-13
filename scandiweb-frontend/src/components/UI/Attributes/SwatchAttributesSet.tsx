import { RenderAttributeSetProps } from "../../Interfaces";

export const SwatchAttributesSet: React.FC<RenderAttributeSetProps> = ({
    attribute_id,
    isSmall = false,
    items,
    selectedAttributeItems,
    onClick,
}) => {

    return (
        <div className={`${isSmall && "small"} flex gap-2`}>
            {items?.map((attributeItem) => {
                return (
                    <span
                        key={attributeItem.attribute_item_id}
                        onClick={() => onClick(attributeItem.attribute_item_id)}
                        className={`attribute-swatch ${
                            selectedAttributeItems[attribute_id ?? 0] ===
                                attributeItem.attribute_item_id &&
                            "attribute-swatch_active"
                        }`}
                        style={{ backgroundColor: `${attributeItem.value}` }}
                    ></span>
                );
            })}
        </div>
    );
};
