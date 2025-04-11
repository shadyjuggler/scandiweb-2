// Svg icon components, extracted to separate component since 'stroke' property must be changable through css

export const Minus = () => {
    return (
        <svg
            width="10"
            height="2"
            viewBox="0 0 10 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1 1H9" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export const Plus = () => {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5 1V9" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 5H9" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};
