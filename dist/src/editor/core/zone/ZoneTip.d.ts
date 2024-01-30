import { Draw } from '../draw/Draw';
import { Zone } from './Zone';
export declare class ZoneTip {
    private zone;
    private i18n;
    private container;
    private pageContainer;
    private isDisableMouseMove;
    private tipContainer;
    private tipContent;
    private currentMoveZone;
    constructor(draw: Draw, zone: Zone);
    private _watchMouseMoveZoneChange;
    private _drawZoneTip;
    private _updateZoneTip;
}
