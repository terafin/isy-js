import { ISY } from '../../ISY';
import { InsteonBaseDevice } from './InsteonBaseDevice';
export declare class InsteonMotionSensorDevice extends InsteonBaseDevice {
    constructor(isy: ISY, deviceNode: {
        family: any;
        type?: string;
        enabled: any;
        deviceClass?: any;
        pnode?: any;
        property?: any;
        flag?: any;
        nodeDefId?: string;
        address?: string;
        name?: string;
        parent?: any;
        ELK_ID?: string;
    });
    handleControlTrigger(controlName: string): boolean;
    get motionDetected(): boolean;
}
