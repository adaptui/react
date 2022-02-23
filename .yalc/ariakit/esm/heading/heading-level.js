import { useContext } from 'react';
import { H as HeadingContext } from '../__utils-5a52896b.js';
import { jsx } from 'react/jsx-runtime';

function HeadingLevel(_ref) {
  let {
    level,
    children
  } = _ref;
  const contextLevel = useContext(HeadingContext);
  const nextLevel = Math.max(Math.min(level || contextLevel + 1, 6), 1);
  return /*#__PURE__*/jsx(HeadingContext.Provider, {
    value: nextLevel,
    children: children
  });
}

export { HeadingLevel };
