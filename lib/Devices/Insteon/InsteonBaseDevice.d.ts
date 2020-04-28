import { Family } from '../../Families';
import { ISY } from '../../ISY';
import { ISYDevice } from '../ISYDevice';
export declare class InsteonBaseDevice extends ISYDevice<Family.Insteon> {
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
    convertFrom(value: any, uom: number): any;
    convertTo(value: any, uom: number): any;
    sendBeep(level?: number): Promise<any>;
}
