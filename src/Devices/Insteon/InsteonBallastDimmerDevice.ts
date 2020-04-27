import { InsteonDimmableDevice } from './InsteonDimmableDevice';
export class InsteonBallastDimmerDevice extends InsteonDimmableDevice {
    constructor (isy: any, deviceNode: any) {
        super(isy, deviceNode);
    }
}
