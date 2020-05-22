import { ISY, InsteonBaseDevice, Family, ISYDevice } from '../../ISY';

import { Commands } from '../../ISYConstants';
import { InsteonRelayDevice } from './InsteonRelayDevice';
import { Insteon } from '../../Families';
import { Constructor } from '../ISYDevice';
import { InsteonKeypadButtonDevice } from './InsteonKeypadDevice';



export const InsteonLampDevice = (InsteonBaseDevice: any) =>
	{
		return class extends InsteonBaseDevice {
			constructor (isy: any, node: any) {
				super(isy, node);
				this.isDimmable = true;
			}

		};
	};
// tslint:disable-next-line: variable-name
export const InsteonSwitchDevice = (InsteonBaseDevice: any) =>
	(class extends InsteonBaseDevice {
		constructor(isy: any, node: any) {
			super(isy, node);

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
