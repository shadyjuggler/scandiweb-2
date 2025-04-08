export const arraysEqual = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
};
