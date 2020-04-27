import { Family } from '../../Families';
import { ISY } from '../../ISY';
import { ISYDevice } from '../ISYDevice';
import { AlarmSensorPhysicalState, AlarmSensorLogicalState } from './ElkAlarmPanelDevice';
export declare class ElkAlarmSensorDevice extends ISYDevice<Family.Elk> {
    area: number;
    zone: string;
    deviceFriendlyName: string;
    deviceType: any;
    connectionType: string;
    batteryOperated: boolean;
    physicalState: AlarmSensorPhysicalState;
    logicalState: AlarmSensorLogicalState;
    voltage: number;
    constructor(isy: ISY, name: string, area: number, zone: string);
    sendCommand(command: string): Promise<any>;
    sendBypassToggleCommand(): Promise<any>;
    getPhysicalState(): AlarmSensorPhysicalState;
    isBypassed(): boolean;
    getLogicalState(): AlarmSensorLogicalState;
    getCurrentDoorWindowState(): boolean;
    getSensorStatus(): string;
    isPresent(): boolean;
    handleEvent(event: {
        control?: string;
        data?: any;
        node?: any;
        eventInfo?: any;
    }): boolean;
}
