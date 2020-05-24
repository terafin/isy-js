import { ISY } from '../../ISY';
import { ISYUpdateableBinaryStateDevice } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';

export class InsteonRelayDevice extends ISYUpdateableBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, node: { family: any; type?: string; enabled: any; deviceClass?: any; pnode?: any; property?: any; flag?: any; nodeDefId?: string; address?: string; name?: string; parent?: any; ELK_ID?: string; }) {
		
		super(isy, node);
	}
	get isOn() {
		return this.state;
	}
	public async updateIsOn(isOn: boolean): Promise<any> {
		if (this.isOn !== isOn) {
			return super.updateState(isOn);
		}
		else {
			return Promise.resolve();
		}
	}
}
