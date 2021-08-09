const DELIMITER = '\t';
const PARSE_PATTERN = new RegExp(
    (
        '(\\' + DELIMITER + '|\\r?\\n|\\r|^)' +
        '(?:"([^"]*(?:""[^"]*)*)"|' +
        '([^"\\' + DELIMITER + '\\r\\n]*))'
    ),
    "gi"
);

const csvToArray = (strData: string): string[][] => {
    const arrData: string[][] = [[]];
    let arrMatches = null;
    while (arrMatches = PARSE_PATTERN.exec(strData)) {
        const strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && (strMatchedDelimiter != DELIMITER)) {
            arrData.push([]);
        }

        const strMatchedValue = (arrMatches[2])
            ? arrMatches[2].replace(new RegExp('""', 'g'), '"') : arrMatches[3];

        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return arrData;
};

export default csvToArray;
