import { ISY } from '../../ISY';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';

export class InsteonDoorWindowSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, deviceNode) {
		super(isy, deviceNode);
	}
	get isOpen() {
		return this.state;
	}
}
