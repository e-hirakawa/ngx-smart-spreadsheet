const CHARS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const LENGTH = CHARS.length;

const generateHeader = (index: number): string => {
    index -= 1;
    const remain = Math.floor(index / LENGTH);
    if (remain > 0) {
        return generateHeader(remain) + CHARS[index % LENGTH];
    }
    return CHARS[index % LENGTH];
};

export default generateHeader;
