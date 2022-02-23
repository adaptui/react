import { HovercardState } from "../hovercard-state";
export declare type Point = [number, number];
export declare type Polygon = Point[];
export declare function getEventPoint(event: MouseEvent): Point;
export declare function isPointInPolygon(point: Point, polygon: Polygon): boolean;
export declare function getElementPolygon(element: Element, placement: HovercardState["placement"]): Polygon;
