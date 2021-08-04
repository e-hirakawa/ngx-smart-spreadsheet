const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const LENGTH = CHARS.length;

const generageId = (): string =>
    new Array(8).fill(null)
        .map(() => CHARS.charAt(Math.floor(Math.random() * LENGTH)))
        .join('');

export default generageId;
