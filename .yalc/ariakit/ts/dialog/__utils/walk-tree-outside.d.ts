declare type Elements = Array<Element | null>;
export declare function isValidElement(element: Element, ignoredElements: Elements): boolean;
export declare function walkTreeOutside(elements: Elements, callback: (element: Element) => void): void;
export {};
