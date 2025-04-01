const sizeValidation = (sizeValue) => {
    const sizeEnum = {
        "Small" : "S",
        "Medium": "M",
        "Large": "L",
        "Extra Large": "XL"
    }

    return sizeEnum[sizeValue] ? sizeEnum[sizeValue] : sizeValue;
}

export default sizeValidation;