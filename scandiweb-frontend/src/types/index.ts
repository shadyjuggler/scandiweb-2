export type AttributeType = {
    displayValue: string,
    value: string,
    id: number | string,
}

export type AttributeSetType = {
    attributeSetItems: AttributeType[],
    name?: string,
    type?: "text" | "swatch"
}

