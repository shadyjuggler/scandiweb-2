import { AttributeSetType } from "../../types/resource";

export type AttributeSetProps = Partial<AttributeSetType> & {
    isSmall: boolean;
    onSelect?: (selectedIndexesArr: number[]) => void;
    selectedAttributeItems: Record<number, number>
};

export type RenderAttributeSetProps = Partial<AttributeSetType> & {
    isSmall: boolean;
    onClick: (index: number) => void;
    selectedAttributeItems: Record<number, number>
};
