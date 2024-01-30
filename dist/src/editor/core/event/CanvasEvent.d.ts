import { IElement, IElementPosition } from '../../interface/Element';
import { ICurrentPosition } from '../../interface/Position';
import { Draw } from '../draw/Draw';
import { IRange } from '../../interface/Range';
export interface ICompositionInfo {
    elementList: IElement[];
    startIndex: number;
    endIndex: number;
    value: string;
}
export declare class CanvasEvent {
    isAllowSelection: boolean;
    isComposing: boolean;
    compositionInfo: ICompositionInfo | null;
    isAllowDrag: boolean;
    isAllowDrop: boolean;
    cacheRange: IRange | null;
    cacheElementList: IElement[] | null;
    cachePositionList: IElementPosition[] | null;
    mouseDownStartPosition: ICurrentPosition | null;
    private draw;
    private pageContainer;
    private pageList;
    private range;
    private position;
    constructor(draw: Draw);
    getDraw(): Draw;
    register(): void;
    setIsAllowSelection(payload: boolean): void;
    setIsAllowDrag(payload: boolean): void;
    clearPainterStyle(): void;
    applyPainterStyle(): void;
    selectAll(): void;
    mousemove(evt: MouseEvent): void;
    mousedown(evt: MouseEvent): void;
    click(): void;
    mouseup(evt: MouseEvent): void;
    mouseleave(evt: MouseEvent): void;
    keydown(evt: KeyboardEvent): void;
    dblclick(evt: MouseEvent): void;
    threeClick(): void;
    input(data: string): void;
    cut(): void;
    copy(): void;
    compositionstart(): void;
    compositionend(evt: CompositionEvent): void;
    drop(evt: DragEvent): void;
    dragover(evt: DragEvent | MouseEvent): void;
}
