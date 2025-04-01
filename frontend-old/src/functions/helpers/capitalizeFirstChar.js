//@param string: string
//@return string

const capitalizeFirstChar = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

export default capitalizeFirstChar;