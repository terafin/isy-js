import { Family } from '../../Families';
import { ISY } from '../../ISY';
import { ISYDevice } from '../ISYDevice';
export declare class ELKAlarmPanelDevice extends ISYDevice<Family.Elk> {
    alarmTripState: AlarmTripState;
    alarmState: AlarmState;
    alarmMode: AlarmMode;
    area: number;
    deviceFriendlyName: string;
    deviceType: any;
    connectionType: string;
    batteryOperated: boolean;
    voltage: number;
    constructor(isy: ISY, area: number);
    sendCommand(command: string): Promise<any>;
    sendSetAlarmModeCommand(alarmMode: string): Promise<any>;
    clearAllBypasses(): Promise<any>;
    getAlarmStatusAsText(): string;
    getAlarmTripState(): AlarmTripState;
    getAlarmState(): AlarmState;
    getAlarmMode(): AlarmMode;
    handleEvent(event: {
        control?: string;
        data?: any;
        node?: any;
        eventInfo?: any;
    }): boolean;
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
export declare enum AlarmSensorPhysicalState {
    NOT_CONFIGURED = 0,
    OPEN = 1,
    EOL = 2,
    SHORT = 3
}
export declare enum AlarmSensorLogicalState {
    NORMAL = 0,
    TROUBLE = 1,
    VIOLATED = 2,
    BYPASSED = 3
}
