import { IControlContext, IControlInstance, IControlRuleOption } from '../../../../interface/Control';
import { IElement } from '../../../../interface/Element';
import { Control } from '../Control';
export declare class CheckboxControl implements IControlInstance {
    private element;
    private control;
    constructor(element: IElement, control: Control);
    getElement(): IElement;
    getCode(): string | null;
    getValue(): IElement[];
    setValue(): number;
    setSelect(codes: string[], context?: IControlContext, options?: IControlRuleOption): void;
    keydown(evt: KeyboardEvent): number | null;
    cut(): number;
}
