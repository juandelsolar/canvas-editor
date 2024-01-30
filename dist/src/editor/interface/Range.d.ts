import { EditorZone } from '../dataset/enum/Editor';
import { IElement, IElementFillRect } from './Element';
export interface IRange {
    startIndex: number;
    endIndex: number;
    isCrossRowCol?: boolean;
    tableId?: string;
    startTdIndex?: number;
    endTdIndex?: number;
    startTrIndex?: number;
    endTrIndex?: number;
    zone?: EditorZone;
}
export declare type RangeRowArray = Map<number, number[]>;
export declare type RangeRowMap = Map<number, Set<number>>;
export declare type RangeRect = IElementFillRect;
export declare type RangeContext = {
    isCollapsed: boolean;
    startElement: IElement;
    endElement: IElement;
    startPageNo: number;
    endPageNo: number;
    rangeRects: RangeRect[];
    zone: EditorZone;
};
