import Editor from '..';
export declare type PluginFunction<Options> = (editor: Editor, options?: Options) => any;
export declare type UsePlugin = <Options>(pluginFunction: PluginFunction<Options>, options?: Options) => void;
