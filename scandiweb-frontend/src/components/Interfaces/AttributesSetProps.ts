import { AttributeType, AttributeSetType } from "../../types"

export interface AttributesSetProps {
    data: AttributeType[],
    onSelect?: (value: string) => void
}