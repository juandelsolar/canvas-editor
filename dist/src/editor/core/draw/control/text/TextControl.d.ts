import { IControlContext, IControlInstance, IControlRuleOption } from '../../../../interface/Control';
import { IElement } from '../../../../interface/Element';
import { Control } from '../Control';
export declare class TextControl implements IControlInstance {
    private element;
    private control;
    constructor(element: IElement, control: Control);
    getElement(): IElement;
    getValue(): IElement[];
    setValue(data: IElement[], context?: IControlContext, options?: IControlRuleOption): number;
    clearValue(context?: IControlContext, options?: IControlRuleOption): number;
    keydown(evt: KeyboardEvent): number | null;
    cut(): number;
}
