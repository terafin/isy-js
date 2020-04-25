Object.defineProperty(exports, "__esModule", { value: true });
const InsteonDevice_1 = require("./InsteonDevice");
const InsteonDimmableDevice_1 = require("./InsteonDimmableDevice");
class InsteonKeypadDimmerDevice extends InsteonDevice_1.KeypadDevice(InsteonDimmableDevice_1.InsteonDimmableDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadDimmerDevice = InsteonKeypadDimmerDevice;
class InsteonBallastDimmerDevice extends InsteonDimmableDevice_1.InsteonDimmableDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonBallastDimmerDevice = InsteonBallastDimmerDevice;
