import { ISYDevice } from '../ISY';
export declare class DeviceFactory {
    static getDeviceDetails(node: {
        family?: any;
        type?: any;
        address?: any;
        nodeDefId: any;
    }): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: typeof ISYDevice;
        unsupported?: true;
    };
}
