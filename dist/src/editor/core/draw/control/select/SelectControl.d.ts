import { IControlContext, IControlInstance, IControlRuleOption } from '../../../../interface/Control';
import { IElement } from '../../../../interface/Element';
import { Control } from '../Control';
export declare class SelectControl implements IControlInstance {
    private element;
    private control;
    private isPopup;
    private selectDom;
    constructor(element: IElement, control: Control);
    getElement(): IElement;
    getCode(): string | null;
    getValue(context?: IControlContext): IElement[];
    setValue(): number;
    keydown(evt: KeyboardEvent): number | null;
    cut(): number;
    clearSelect(context?: IControlContext, options?: IControlRuleOption): number;
    setSelect(code: string, context?: IControlContext, options?: IControlRuleOption): void;
    private _createSelectPopupDom;
    awake(): void;
    destroy(): void;
}
