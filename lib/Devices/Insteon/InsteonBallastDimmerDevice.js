Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonBallastDimmerDevice = void 0;
const InsteonDimmableDevice_1 = require("./InsteonDimmableDevice");
class InsteonBallastDimmerDevice extends InsteonDimmableDevice_1.InsteonDimmableDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonBallastDimmerDevice = InsteonBallastDimmerDevice;
