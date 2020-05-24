import { ISY } from '../../ISY';
import { InsteonRelayDevice } from './InsteonRelayDevice';


export class InsteonKeypadButtonDevice extends InsteonRelayDevice {
	constructor (isy: ISY, deviceNode: any) {
		super(isy, deviceNode);
	}
}
