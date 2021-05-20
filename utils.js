const replaceChar = (s, i, c) => {
    return s.substr(0, i) + String(c) + s.substr(i + 1);
}

module.exports = { replaceChar };