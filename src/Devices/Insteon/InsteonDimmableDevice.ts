import { ISY } from '../../ISY';
import { ISYLevelDevice } from '../ISYDevice';
import { InsteonRelayDevice } from './InsteonRelayDevice';

export class InsteonDimmableDevice extends ISYLevelDevice(InsteonRelayDevice) {
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