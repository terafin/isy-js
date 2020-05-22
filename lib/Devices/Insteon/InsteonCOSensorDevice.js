Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonCOSensorDevice = void 0;
const ISYDevice_1 = require("../ISYDevice");
const InsteonBaseDevice_1 = require("./InsteonBaseDevice");
class InsteonCOSensorDevice extends ISYDevice_1.ISYBinaryStateDevice(InsteonBaseDevice_1.InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get monoxideDetected() {
        return this.state;
    }
}
exports.InsteonCOSensorDevice = InsteonCOSensorDevice;
