import { AttributeSetType } from "../../types/resource";

export type AttributeSetProps = Partial<AttributeSetType> & {
    isSmall: boolean;
    name: string;
    onSelect?: (selectedIndexesArr: number[]) => void;
    selectedAttributeItems: Record<number, number>
};

export interface CartItemProps {
    id: string;
    title: string;
    price: string;
    attributeSets: AttributeSetType[];
    selectedAttributeItems: Record<number, number>
    quantity: number;
    imgUrl: string;
}