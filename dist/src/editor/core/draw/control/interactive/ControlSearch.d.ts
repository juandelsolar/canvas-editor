import { IControlHighlight, IControlHighlightRule } from '../../../../interface/Control';
import { ISearchResult } from '../../../../interface/Search';
import { Control } from '../Control';
declare type IHighlightMatchResult = (ISearchResult & IControlHighlightRule)[];
export declare class ControlSearch {
    private draw;
    private options;
    private highlightList;
    private highlightMatchResult;
    constructor(control: Control);
    getHighlightMatchResult(): IHighlightMatchResult;
    getHighlightList(): IControlHighlight[];
    setHighlightList(payload: IControlHighlight[]): void;
    computeHighlightList(): void;
    renderHighlightList(ctx: CanvasRenderingContext2D, pageIndex: number): void;
}
export {};
