declare const InsteonDimmerSwitchDevice_base: {
    new (isy: any, node: any): {
        [x: string]: any;
    };
    [x: string]: any;
};
export declare class InsteonDimmerSwitchDevice extends InsteonDimmerSwitchDevice_base {
    constructor(isy: any, deviceNode: any);
}
export {};
