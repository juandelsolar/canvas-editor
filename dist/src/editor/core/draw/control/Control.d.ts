import { IControlContext, IControlHighlight, IControlInitOption, IControlInstance, IGetControlValueOption, IGetControlValueResult, ISetControlExtensionOption, ISetControlValueOption } from '../../../interface/Control';
import { IElement, IElementPosition } from '../../../interface/Element';
import { IRange } from '../../../interface/Range';
import { Draw } from '../Draw';
interface IMoveCursorResult {
    newIndex: number;
    newElement: IElement;
}
export declare class Control {
    private draw;
    private range;
    private listener;
    private eventBus;
    private controlSearch;
    private options;
    private controlOptions;
    private activeControl;
    constructor(draw: Draw);
    setHighlightList(payload: IControlHighlight[]): void;
    computeHighlightList(): void;
    renderHighlightList(ctx: CanvasRenderingContext2D, pageNo: number): void;
    getDraw(): Draw;
    filterAssistElement(elementList: IElement[]): IElement[];
    isPartRangeInControlOutside(): boolean;
    isRangInPostfix(): boolean;
    isRangeWithinControl(): boolean;
    isDisabledControl(): boolean;
    getContainer(): HTMLDivElement;
    getElementList(): IElement[];
    getPosition(): IElementPosition | null;
    getPreY(): number;
    getRange(): IRange;
    shrinkBoundary(): void;
    getActiveControl(): IControlInstance | null;
    initControl(): void;
    destroyControl(): void;
    repaintControl(curIndex?: number): void;
    moveCursor(position: IControlInitOption): IMoveCursorResult;
    removeControl(startIndex: number, context?: IControlContext): number | null;
    removePlaceholder(startIndex: number, context?: IControlContext): void;
    addPlaceholder(startIndex: number, context?: IControlContext): void;
    setValue(data: IElement[]): number;
    keydown(evt: KeyboardEvent): number | null;
    cut(): number;
    getValueByConceptId(payload: IGetControlValueOption): IGetControlValueResult;
    setValueByConceptId(payload: ISetControlValueOption): void;
    setExtensionByConceptId(payload: ISetControlExtensionOption): void;
}
export {};
