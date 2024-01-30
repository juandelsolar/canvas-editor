import { IElement } from '../../../interface/Element';
import { IRowElement } from '../../../interface/Row';
import { Draw } from '../Draw';
export declare class CheckboxParticle {
    private draw;
    private options;
    constructor(draw: Draw);
    setSelect(element: IElement): void;
    render(ctx: CanvasRenderingContext2D, element: IRowElement, x: number, y: number): void;
}
