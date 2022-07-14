// get now in seconds
export const nowInSeconds = ():number => {
    return Math.ceil(new Date().getTime() / 1000);
}