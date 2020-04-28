import { ISYDevice } from './ISY';
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
    static getInsteonDeviceDetails(typeCode: string, node: {
        address?: any;
        nodeDefId: any;
    }): {
        name: string;
        modelNumber?: string;
        version?: string;
        class: typeof ISYDevice;
        unsupported?: true;
    };
    static getNLSNetworkBridgeInfo(deviceCode: number): {
        name: string;
        modelNumber: string;
        version: string;
        class: typeof ISYDevice;
    };
    static getNLSIrrigationControlInfo(deviceCode: number): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: typeof ISYDevice;
    };
    static getNLSSwitchLightInfo(deviceCode: number, subAddress: string): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: typeof ISYDevice;
    };
    private static getNLSDimLightInfo;
    private static getNLSControllerInfo;
    private static getNLSIOControlInfo;
    private static getNLSSHS;
    private static getNLSClimateControlInfo;
    private static getNLSAccessControlInfo;
    private static getNLSEnergyManagement;
    private static getNLSWindowsCovering;
}
