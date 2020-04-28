Object.defineProperty(exports, "__esModule", { value: true });
const ISYConstants_1 = require("../../ISYConstants");
const ISYDevice_1 = require("../ISYDevice");
const InsteonBaseDevice_1 = require("./InsteonBaseDevice");
const InsteonDimmableDevice_1 = require("./InsteonDimmableDevice");
class InsteonFanMotorDevice extends ISYDevice_1.ISYUpdateableLevelDevice(ISYDevice_1.ISYUpdateableBinaryStateDevice(InsteonBaseDevice_1.InsteonBaseDevice)) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.hidden = true;
    }
    get isOn() {
        return this.state;
    }
    get fanSpeed() {
        return this.level;
    }
    async updateFanSpeed(level) {
        return this.updateLevel(level);
    }
    async updateIsOn(isOn) {
        if (!isOn) {
            return this.updateLevel(ISYConstants_1.States.Level.Min);
        }
        else {
            return this.updateLevel(ISYConstants_1.States.Level.Max);
        }
    }
}
exports.InsteonFanMotorDevice = InsteonFanMotorDevice;
class InsteonFanDevice extends InsteonBaseDevice_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.light = new InsteonDimmableDevice_1.InsteonDimmableDevice(isy, deviceNode);
        this.light.on('PropertyChanged', ((a, b, c, d) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));
        this.addChild(this.light);
    }
    handleEvent(event) {
        this.isy.logger(JSON.stringify(event));
        const child = this.children.find((p) => p.address === event.node);
        if (child !== undefined) {
            return child.handleEvent(event);
        }
        return false;
    }
    addChild(childDevice) {
        super.addChild(childDevice);
        if (childDevice instanceof InsteonFanMotorDevice) {
            this.logger('Fan Motor Found');
            this.motor = childDevice;
            this.motor.on('PropertyChanged', ((a, b, c, d) => { this.emit('PropertyChanged', `motor.${a}`, b, c, d); }).bind(this));
        }
    }
    async updateFanSpeed(level) {
        return this.motor.updateLevel(level);
    }
    async updatFanIsOn(isOn) {
        if (!isOn) {
            this.motor.updateLevel(ISYConstants_1.States.Level.Min);
        }
        else {
            this.motor.updateLevel(ISYConstants_1.States.Fan.High);
        }
    }
}
exports.InsteonFanDevice = InsteonFanDevice;
