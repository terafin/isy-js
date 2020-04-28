Object.defineProperty(exports, "__esModule", { value: true });
const ISYConstants_1 = require("../../ISYConstants");
const InsteonBaseDevice_1 = require("./InsteonBaseDevice");
class InsteonMotionSensorDevice extends InsteonBaseDevice_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this._isMotionDetected = false;
    }
    handleControlTrigger(controlName) {
        if (!super.handleControlTrigger(controlName)) {
            if (controlName === ISYConstants_1.Commands.On) {
                this.logger('Motion detected.');
                this._isMotionDetected = true;
                this.emit('ControlTriggered', controlName);
                //this.propertyChanged.emit('', 'motionDetected', true, true);
                setTimeout(() => {
                    this.logger('No motion detected in last 30 seconds.');
                    this._isMotionDetected = false;
                    //this.propertyChanged.emit('', 'motionDetected', false, false);
                }, 30000);
            }
            else if (controlName === ISYConstants_1.Commands.Off) {
                this._isMotionDetected = false;
                this.logger('No motion detected.');
                this.emit('ControlTriggered', controlName);
            }
        }
        return true;
    }
    get motionDetected() {
        return this._isMotionDetected;
    }
}
exports.InsteonMotionSensorDevice = InsteonMotionSensorDevice;
