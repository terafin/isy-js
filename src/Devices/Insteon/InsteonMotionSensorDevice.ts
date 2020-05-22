import { ISY } from '../../ISY';
import { Commands } from '../../ISYConstants';
import { InsteonBaseDevice } from './InsteonBaseDevice';

export class InsteonMotionSensorDevice extends InsteonBaseDevice {
	constructor (isy: ISY, deviceNode: { family: any; type?: string; enabled: any; deviceClass?: any; pnode?: any; property?: any; flag?: any; nodeDefId?: string; address?: string; name?: string; parent?: any; ELK_ID?: string; }) {
		super(isy, deviceNode);
		this._isMotionDetected = false;
	}

	public handleControlTrigger(controlName: string) {

			if (controlName === Commands.On) {
				this.logger('Motion detected.');
				this._isMotionDetected = true;
				this.emit('ControlTriggered',controlName);
				this.emit('PropertyChanged', 'motionDetected', true, false, "true");
				
				setTimeout(() => {
					this.logger('No motion detected in last 30 seconds.');
					this._isMotionDetected = false;
					this.emit('PropertyChanged', 'motionDetected', false, true, "false"); /*Included for compatiblity purposes*/
				}, 30000);
				return true;
			}

			else if (controlName === Commands.Off) {
				this._isMotionDetected = false;
				this.logger('No motion detected.');
				this.emit('ControlTriggered',controlName);
				this.emit('PropertyChanged', 'motionDetected', false, true, "false");
				return true;
			}

		return false;
	}
	get motionDetected (): boolean{
		return this._isMotionDetected;
	}



}
