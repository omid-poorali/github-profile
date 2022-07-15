// get now in seconds
export const nowInSeconds = (): number => {
    return Math.ceil(new Date().getTime() / 1000);
}


export const getLocaleString = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    return date.toLocaleString();
}

