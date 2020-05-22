import { Family } from './Families';
import { ISY, ISYDevice } from './ISY';
import { ISYNode } from './ISYNode';
export declare class ISYScene extends ISYNode {
    type: string;
    connectionType: string;
    batteryOperated: boolean;
    deviceType: any;
    deviceFriendlyName: string;
    members: Array<ISYDevice<any>>;
    isDimmable: boolean;
    typeCode: string;
    constructor(isy: ISY, scene: {
        members?: {
            link: any;
        };
        flag?: any;
        nodeDefId?: string;
        address?: string;
        name?: string;
        family?: Family;
        parent?: any;
        enabled: boolean;
        ELK_ID?: string;
    });
    get isOn(): boolean;
    get brightnessLevel(): number;
    recalculateState(): boolean;
    markAsChanged(): void;
    updateIsOn(lightState: boolean): Promise<any>;
    updateBrightnessLevel(level: any): Promise<any>;
    getAreAllLightsInSpecifiedState(state: any): boolean;
}
