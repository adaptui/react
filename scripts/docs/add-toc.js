const toc = require("markdown-toc");
const { outdent } = require("outdent");

// eslint-disable-next-line no-useless-escape
const TOC_REPLACE_FLAG = /\<\!\-\- INJECT_TOC \-\-\>/m;

const addToc = docsTemplate => {
  const tocContents = outdent`
    ## Table of Contents

    ${toc(docsTemplate, { firsth1: false }).content}
  `;

  return docsTemplate.replace(TOC_REPLACE_FLAG, tocContents);
};

module.exports = { addToc };
