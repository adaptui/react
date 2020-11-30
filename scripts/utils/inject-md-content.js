const injectMdContent = (md, regex, callback) => {
  return md
    .split("\n")
    .map(line => {
      const flagMatch = line.match(regex);
      if (flagMatch) {
        return callback(line, flagMatch);
      }
      return line;
    })
    .join("\n");
};

module.exports = injectMdContent;
