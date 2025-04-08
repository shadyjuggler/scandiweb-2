import { AttributeSetType } from "../../types";

export type AttributeSetProps = Partial<AttributeSetType> & {
    defaultActiveAttributeIndex?: number;
    isSmall?: boolean;
    onSelect?: (selectedIndexesArr: number[]) => void;
    productSelectedAttributes?: number[];
    orderIndex?: number;
    type?: "swatch" | "text";
};

export type RenderAttributeSetProps = Partial<AttributeSetType> & {
    active: number;
    isSmall: boolean;
    onClick: (index: number) => void;
};
