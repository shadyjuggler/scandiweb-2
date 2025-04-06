import { AttributeSetType } from "../../types"

export type AttributeSetProps = Partial<AttributeSetType> & {
    isSmall?: boolean,
    onSelect?: (value: string) => void
}