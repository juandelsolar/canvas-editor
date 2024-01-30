import { IPasteOption } from '../../../interface/Event';
import { CanvasEvent } from '../CanvasEvent';
export declare function pastHTML(host: CanvasEvent, htmlText: string): void;
export declare function pasteImage(host: CanvasEvent, file: File | Blob): void;
export declare function pasteByEvent(host: CanvasEvent, evt: ClipboardEvent): void;
export declare function pasteByApi(host: CanvasEvent, options?: IPasteOption): Promise<void>;
