import { timingSafeEqual } from 'crypto';
import { Family } from '../../Families';
import { ISY } from '../../ISY';
import { ISYDevice } from '../ISYDevice';
import { ElkAlarmSensorDevice } from './ElkAlarmSensorDevice';

/////////////////////////////
// ELKAlarmPanelDevice

//
export class ELKAlarmPanelDevice extends ISYDevice<Family.Elk> {

	public alarmTripState: AlarmTripState;
	public alarmState: AlarmState;
	public alarmMode: AlarmMode;
	public area: number;

	public deviceFriendlyName: string;
	public deviceType: any;
	public connectionType: string;
	public batteryOperated: boolean;
	public voltage: number;

	constructor(isy: ISY, area: number) {

		super(isy, { family: Family.Elk, type: '0.0.0.0', enabled: true, address: `ElkAlarmPanel_${area}`, name: `Elk Alarm Panel ${area}` });

		this.area = area;
		this.alarmTripState = AlarmTripState.DISARMED;
		this.alarmState = AlarmState.NOT_READY_TO_ARM;
		this.alarmMode = AlarmMode.DISARMED;

		this.deviceFriendlyName = 'Elk Alarm Panel ' + area;

		this.connectionType = 'Elk Network Module';
		this.batteryOperated = false;
		this.voltage = 71;
		this
			.lastChanged = new Date();
	}

	public async sendCommand(command: string): Promise<any> {

		return this.isy.sendISYCommand(`elk/area/${this.area}/cmd/${command}`);

	}

	public async sendSetAlarmModeCommand(alarmMode: string) {
		if (alarmMode === 'disarm') {
			return this.sendCommand('disarm');
		} else {
			return this.sendCommand(`arm?armType=${alarmMode}`);
		}
	}
	public async clearAllBypasses() {
		return this.sendCommand('unbypass');
	}
	public getAlarmStatusAsText() {
		return `AM [${this.alarmMode}] AS [${this.alarmState}] ATS [${this.alarmTripState}]`;
	}
	public getAlarmTripState() {
		return this.alarmTripState;
	}
	public getAlarmState() {
		return this.alarmState;
	}
	public getAlarmMode() {
		return this.alarmMode;
	}
	public handleEvent(event: { control?: string; data?: any; node?: any; eventInfo?: any; }) {
		const areaUpdate = event.eventInfo.ae;
		const areaId = areaUpdate.attr.area;
		const updateType = areaUpdate.attr.type;
		const valueToSet = Number(areaUpdate.attr.val);
		let valueChanged = false;
		if (areaId === this.area) {
			if (updateType === AlarmPanelProperty.AlarmTripState) {
				if (this.alarmTripState !== valueToSet) {
					const oldVal = this.alarmTripState;
					this.alarmTripState = valueToSet;
					this.emit('PropertyChanged', 'alarmTripState', this.alarmTripState, oldVal, AlarmTripState[this.alarmTripState]);
					valueChanged = true;
				}
			} else if (updateType === AlarmPanelProperty.AlarmState) {
				if (this.alarmState !== valueToSet) {
					const oldVal = this.alarmState;
					this.alarmState = valueToSet;
					this.emit('PropertyChanged', 'alarmState', this.alarmState, oldVal, AlarmState[this.alarmState]);
					valueChanged = true;
				}
			} else if (updateType === AlarmPanelProperty.AlarmMode) {
				if (this.alarmMode !== valueToSet) {
					const oldVal = this.alarmMode;
					this.alarmMode = valueToSet;
					this.emit('PropertyChanged', 'alarmMode', this.alarmState, oldVal, AlarmMode[this.alarmMode]);
					valueChanged = true;
				}
			}
		}
		if (valueChanged) {
			this.lastChanged = new Date();
		}

		return valueChanged;
	}

}

export enum AlarmPanelProperty {
	AlarmMode = 3,
	AlarmState = 2,
	AlarmTripState = 1
}

export enum AlarmMode {
	DISARMED = 0,
	AWAY = 1,
	STAY = 2,
	STAY_INSTANT = 3,
	NIGHT = 4,
	NIGHT_INSTANT = 5,
	VACATION = 6
}

export enum AlarmTripState {
	DISARMED = 0,
	EXIT_DELAY = 1,
	TRIPPED = 2

}

export enum AlarmState {
	NOT_READY_TO_ARM = 0,
	READY_TO_ARM = 1,
	READY_TO_ARM_VIOLATION = 2,
	ARMED_WITH_TIMER = 3,
	ARMED_FULLY = 4,
	FORCE_ARMED_VIOLATION = 5,
	ARMED_WITH_BYPASS = 6

}

// Alarm mode constanrs
ELKAlarmPanelDevice.prototype.ALARM_MODE_DISARMED = 0;
ELKAlarmPanelDevice.prototype.ALARM_MODE_AWAY = 1;
ELKAlarmPanelDevice.prototype.ALARM_MODE_STAY = 2;
ELKAlarmPanelDevice.prototype.ALARM_MODE_STAY_INSTANT = 3;
ELKAlarmPanelDevice.prototype.ALARM_MODE_NIGHT = 4;
ELKAlarmPanelDevice.prototype.ALARM_MODE_NIGHT_INSTANT = 5;
ELKAlarmPanelDevice.prototype.ALARM_MODE_VACATION = 6;

// Alarm trip state
ELKAlarmPanelDevice.prototype.ALARM_TRIP_STATE_DISARMED = 0;
ELKAlarmPanelDevice.prototype.ALARM_TRIP_STATE_EXIT_DELAY = 1;
ELKAlarmPanelDevice.prototype.ALARM_TRIP_STATE_TRIPPED = 2;

// Alarm state
ELKAlarmPanelDevice.prototype.ALARM_STATE_NOT_READY_TO_ARM = 0;
ELKAlarmPanelDevice.prototype.ALARM_STATE_READY_TO_ARM = 1;
ELKAlarmPanelDevice.prototype.ALARM_STATE_READY_TO_ARM_VIOLATION = 2;
ELKAlarmPanelDevice.prototype.ALARM_STATE_ARMED_WITH_TIMER = 3;
ELKAlarmPanelDevice.prototype.ALARM_STATE_ARMED_FULLY = 4;
ELKAlarmPanelDevice.prototype.ALARM_STATE_FORCE_ARMED_VIOLATION = 5;
ELKAlarmPanelDevice.prototype.ALARM_STATE_ARMED_WITH_BYPASS = 6;

// Logical Status for sensors
export enum AlarmSensorPhysicalState {
	NOT_CONFIGURED = 0,
	OPEN = 1,
	EOL = 2,
	SHORT = 3
}

ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_NOT_CONFIGURED = 0;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_OPEN = 1;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_EOL = 2;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_SHORT = 3;

export enum AlarmSensorLogicalState {
	NORMAL = 0,
	TROUBLE = 1,
	VIOLATED = 2,
	BYPASSED = 3
}

// Physical status for sensors
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_NORMAL = 0;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_TROUBLE = 1;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_VIOLATED = 2;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_BYPASSED = 3;
