import { ISY } from '../../ISY';
import { InsteonBaseDevice } from './InsteonBaseDevice';
export declare class InsteonThermostatDevice extends InsteonBaseDevice {
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
    get currentTemperature(): any;
    get coolSetPoint(): any;
    get heatSetPoint(): any;
    get mode(): any;
    get operatingMode(): any;
    get fanMode(): any;
    get humidity(): any;
    updateCoolSetPoint(value: string): Promise<any>;
    updateHeatSetPoint(value: string): Promise<any>;
    updateMode(value: string): Promise<any>;
}
