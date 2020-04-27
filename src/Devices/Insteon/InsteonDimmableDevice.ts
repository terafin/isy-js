import { ISY } from '../../ISY';
import { ISYUpdateableLevelDevice } from '../ISYDevice';
import { InsteonRelayDevice } from './InsteonRelayDevice';

export class InsteonDimmableDevice extends ISYUpdateableLevelDevice(InsteonRelayDevice) {
	constructor (isy: ISY, node: any) {
		super(isy, node);
		this.isDimmable = true;
	}
	get brightnessLevel() {
		return this.level;
	}
	public async updateBrightnessLevel(level: number): Promise<{}> {
		return super.updateLevel(level);
	}
}
