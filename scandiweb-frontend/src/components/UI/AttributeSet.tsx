import { AttributeSetProps } from "../Interfaces";

import { useRuntime } from "../../context/RuntimeContext";

export const AttributeSet: React.FC<AttributeSetProps> = ({
    attribute_id,
    isSmall = false,
    items,
    selectedAttributeItems,
    type,
}) => {
    const { updateSelectedAttributeItems } = useRuntime();

    const onClick = (attribute_item_id: number) => {
        if (!attribute_id) return;
        updateSelectedAttributeItems(attribute_id, attribute_item_id);
    };

    if (!type) {
        return <p className="text-semibold">No attribute set type provided</p>;
    }

    if (!items) {
        return <p className="text-semibold">No attribute items provided</p>;
    }

    return (
        <div
            className={`${isSmall && "small"} ${
                type === "swatch" ? "swatch" : type === "text" ? "text" : ""
            }`}
        >
            {items?.map((attributeItem) => {
                return (
                    <span
                        key={attributeItem.attribute_item_id}
                        onClick={() => onClick(attributeItem.attribute_item_id)}
                        className={`attribute-${type} ${
                            selectedAttributeItems[attribute_id ?? 0] ===
                                attributeItem.attribute_item_id &&
                            `attribute-${type}_active`
                        }`}
                        style={
                            type === "swatch"
                                ? { backgroundColor: `${attributeItem.value}` }
                                : {}
                        }
                    >
                        {type === "text" && (
                            <p className="sourcesanspro">
                                {attributeItem.value}
                            </p>
                        )}
                    </span>
                );
            })}
        </div>
    );
};
