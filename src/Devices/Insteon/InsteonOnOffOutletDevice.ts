import { ISY, ISYDevice, Family } from '../../ISY';
import { InsteonRelayDevice } from './InsteonRelayDevice';

export class InsteonOnOffOutletDevice extends InsteonRelayDevice {

	public outlet1: InsteonRelayDevice;
	public outlet2: InsteonRelayDevice;

	constructor(isy: ISY, deviceNode: any) {
		super(isy, deviceNode);
		this.outlet1 = new InsteonRelayDevice(isy, deviceNode);
		this.outlet1.on('PropertyChanged',(p,v,f) => this.handlePropertyChange("outlet1."+ p, v, f));
		super.addChild(this.outlet1);

	}
	public addChild(childDevice: ISYDevice<Family.Insteon>) {
		super.addChild(childDevice);
		this.outlet2 = childDevice as InsteonRelayDevice;
		this.outlet2.on('PropertyChanged', (p, v, f) => this.handlePropertyChange("outlet2." + p, v, f));
		// if(childDevice)
	}
}
