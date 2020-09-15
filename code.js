// Letters that can be included in URLs
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", "_"];

module.exports = {
    generateCode
}

function generateCode() {

    let timestamp = Math.floor(new Date().getTime()).toString();
    // Make length of timestamp even by removing (pretty useless) 1/100 of a second accuracy
    timestamp = timestamp.slice(0, -1);

    let code = "";
    for (let i = 0; i < timestamp.length; i += 2) {

        if (timestamp.slice(i, i + 2) >= letters.length) {
            code += letters[Number(timestamp.slice(i, i + 1))]
            code += letters[Number(timestamp.slice(i + 1, i + 2))]

        } else {
            code += letters[Number(timestamp.slice(i, i + 2))]
        }
    }
    return code
}