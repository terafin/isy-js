import { Family } from '../../Families';
import { ISY, ISYNode } from '../../ISY';
import { States } from '../../ISYConstants';
import { ISYBinaryStateDevice, ISYDevice, ISYLevelDevice } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';
import { InsteonDimmableDevice } from './InsteonDimmableDevice';

export class InsteonFanMotorDevice extends ISYLevelDevice(ISYBinaryStateDevice(InsteonBaseDevice)) {
	constructor(isy: ISY, deviceNode: {
		type: string;
	}) {
		super(isy, deviceNode);
		this.hidden = true;
	}

	get isOn() {
		return this.state;
	}
	get fanSpeed() {
		return this.level;
	}

	public async updateFanSpeed(level: number) {
		return this.updateLevel(level);
	}
	public async updateIsOn(isOn: boolean) {
		if (!isOn) {
			this.updateLevel(States.Level.Min);
		} else {
			this.updateLevel(States.Level.Max);
		}
	}

}

export class InsteonFanDevice extends InsteonBaseDevice {
	public light: InsteonDimmableDevice;
	public motor: InsteonFanMotorDevice;
	constructor(isy: ISY, deviceNode: {
		type: string;
	}) {
		super(isy, deviceNode);
		this.light = new InsteonDimmableDevice(isy, deviceNode);
		this.light.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));
		this.addChild(this.light);

	}

	public handleEvent(event: { control?: string; data?: any; node?: any; }): boolean {
		const child = this.children.find((p) => p.address === event.node);
		if (child !== undefined) {
			return child.handleEvent(event);
		}
		return null;
	}

	public addChild(childDevice: ISYDevice<Family.Insteon>) {
		super.addChild(childDevice);
		if (childDevice instanceof InsteonFanMotorDevice) {
			this.logger('Fan Motor Found');
			this.motor = childDevice as InsteonFanMotorDevice;
			this.motor.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `motor.${a}`, b, c, d); }).bind(this));
		}
	}

	public async updateFanSpeed(level: number) {
		return this.motor.updateLevel(level);
	}
	public async updatFanIsOn(isOn: boolean) {
		if (!isOn) {
			this.motor.updateLevel(States.Level.Min);
		} else {
			this.motor.updateLevel(States.Fan.High);
		}
	}

}
