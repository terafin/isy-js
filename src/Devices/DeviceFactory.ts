
import { Family, ISYDevice } from '../ISY';
import { InsteonDeviceFactory } from './Insteon/InsteonDeviceFactory';


export class DeviceFactory {

	public static getDeviceDetails(node: { family?: any; type?: any; address?: any; nodeDefId: any; }): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; unsupported?: true } {
	

		// tslint:disable-next-line: triple-equals
		if ((node.family ?? Family.Insteon) == Family.Insteon) {

			return InsteonDeviceFactory.getInsteonDeviceDetails(node.type, node);

		} else { return {name: 'Unsupported Device', class: ISYDevice, unsupported: true} }
	}


}
