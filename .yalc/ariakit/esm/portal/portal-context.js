import { createContext } from 'react';

/**
 * Stores the element that will contain the portal. By default, it will be the
 * body of the document.
 * @example
 * ```jsx
 * const container = document.getElementById("container");
 *
 * function App() {
 *   return (
 *     <PortalContext.Provider value={container}>
 *       <Portal />
 *     </PortalContext.Provider>
 *   );
 * }
 * ```
 */

const PortalContext = /*#__PURE__*/createContext(null);

export { PortalContext };
