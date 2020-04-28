import { ISY } from '../../ISY';
import { Commands } from '../../ISYConstants';
import { InsteonBaseDevice } from './InsteonBaseDevice';

export class InsteonMotionSensorDevice extends InsteonBaseDevice {
	constructor (isy: ISY, deviceNode: { family: any; type?: string; enabled: any; deviceClass?: any; pnode?: any; property?: any; flag?: any; nodeDefId?: string; address?: string; name?: string; parent?: any; ELK_ID?: string; }) {
		super(isy, deviceNode);
		this._isMotionDetected = false;
	}

	public handleControlTrigger(controlName: string) {
		if (!super.handleControlTrigger(controlName)) {
			if (controlName === Commands.On) {
				this.logger('Motion detected.');
				this._isMotionDetected = true;
				this.emit('ControlTriggered',controlName);
				//this.propertyChanged.emit('', 'motionDetected', true, true);
				setTimeout(() => {
					this.logger('No motion detected in last 30 seconds.');
					this._isMotionDetected = false;
					//this.propertyChanged.emit('', 'motionDetected', false, false);
				}, 30000);
			}

			else if (controlName === Commands.Off) {
				this._isMotionDetected = false;
				this.logger('No motion detected.');
				this.emit('ControlTriggered',controlName);
			}
		}
		return true;
	}
	get motionDetected (): boolean{
		return this._isMotionDetected;
	}



}
