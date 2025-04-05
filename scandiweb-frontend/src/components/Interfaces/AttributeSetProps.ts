import { AttributeSetType } from "../../types"

export interface AttributeSetProps extends AttributeSetType {
    isSmall?: boolean,
    onSelect?: (value: string) => void
}