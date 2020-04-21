import { Family } from '../../Families';
import { ISY } from '../../ISY';
import { ISYDevice } from '../ISYDevice';
export declare class ELKAlarmPanelDevice extends ISYDevice<Family.Elk> {
    alarmTripState: AlarmTripState;
    alarmState: AlarmState;
    alarmMode: AlarmMode;
    area: any;
    deviceFriendlyName: string;
    deviceType: any;
    connectionType: string;
    batteryOperated: boolean;
    voltage: number;
    constructor(isy: ISY, area: number);
    sendCommand(command: string): Promise<any>;
    sendSetAlarmModeCommand(alarmState: string): Promise<any>;
    clearAllBypasses(): Promise<any>;
    getAlarmStatusAsText(): string;
    getAlarmTripState(): AlarmTripState;
    getAlarmState(): AlarmState;
    getAlarmMode(): AlarmMode;
    handleEvent(event: any): boolean;
}
export declare enum AlarmPanelProperty {
    AlarmMode = 3,
    AlarmState = 2,
    AlarmTripState = 1
}
export declare enum AlarmMode {
    DISARMED = 0,
    AWAY = 1,
    STAY = 2,
    STAY_INSTANT = 3,
    NIGHT = 4,
    NIGHT_INSTANT = 5,
    VACATION = 6
}
export declare enum AlarmTripState {
    DISARMED = 0,
    EXIT_DELAY = 1,
    TRIPPED = 2
}
export declare enum AlarmState {
    NOT_READY_TO_ARM = 0,
    READY_TO_ARM = 1,
    READY_TO_ARM_VIOLATION = 2,
    ARMED_WITH_TIMER = 3,
    ARMED_FULLY = 4,
    FORCE_ARMED_VIOLATION = 5,
    ARMED_WITH_BYPASS = 6
}
export declare class ElkAlarmSensorDevice extends ISYDevice<Family.Elk> {
    area: any;
    zone: any;
    deviceFriendlyName: string;
    deviceType: any;
    connectionType: string;
    batteryOperated: boolean;
    physicalState: number;
    logicalState: number;
    voltage: number;
    constructor(isy: any, name: any, area: any, zone: any);
    sendBypassToggleCommand(): Promise<any>;
    getPhysicalState(): number;
    isBypassed(): boolean;
    getLogicalState(): number;
    getCurrentDoorWindowState(): boolean;
    getSensorStatus(): string;
    isPresent(): boolean;
    handleEvent(event: any): boolean;
}
