import { ISY } from '../../ISY';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';

export class InsteonCOSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, deviceNode: { family: any; type?: string; enabled: any; deviceClass?: any; pnode?: any; property?: any; flag?: any; nodeDefId?: string; address?: string; name?: string; parent?: any; ELK_ID?: string; }) {
		super(isy, deviceNode);
	}
	get monoxideDetected() {
		return this.state;
	}
}
