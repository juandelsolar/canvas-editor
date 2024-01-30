import { Draw } from '../draw/Draw';
export interface IElementVisibleInfo {
    intersectionHeight: number;
}
export interface IPageVisibleInfo {
    intersectionPageNo: number;
    visiblePageNoList: number[];
}
export declare class ScrollObserver {
    private draw;
    private options;
    private scrollContainer;
    constructor(draw: Draw);
    getScrollContainer(): Element | Document;
    private _addEvent;
    removeEvent(): void;
    getElementVisibleInfo(element: Element): IElementVisibleInfo;
    getPageVisibleInfo(): IPageVisibleInfo;
    private _observer;
}
