import { Family, InsteonBaseDevice, ISY, ISYDevice } from '../../ISY';

import { Insteon } from '../../Families';
import { Commands } from '../../ISYConstants';
import { Constructor } from '../ISYDevice';
import { InsteonKeypadButtonDevice } from './InsteonKeypadDevice';
import { InsteonRelayDevice } from './InsteonRelayDevice';

export const InsteonLampDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {

			constructor(...args: any[]) {
				super(args[0], args[1]);
				this.isDimmable = true;
			}

		});

// tslint:disable-next-line: variable-name
export const InsteonSwitchDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {

	constructor (...args: any[]) {
		super(args[0], args[1]);
		this.isDimmable = true;
	}

});

export const KeypadDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {

	public addChild(childDevice: ISYDevice<Family.Insteon>)
	{
		super.addChild(childDevice);
	}
});


export class InsteonOutletDevice extends InsteonRelayDevice {
	constructor(isy: ISY, deviceNode: any) {
		super(isy, deviceNode);
	}
}
