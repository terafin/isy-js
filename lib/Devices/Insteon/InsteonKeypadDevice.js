Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonKeypadButtonDevice = void 0;
const InsteonRelayDevice_1 = require("./InsteonRelayDevice");
class InsteonKeypadButtonDevice extends InsteonRelayDevice_1.InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadButtonDevice = InsteonKeypadButtonDevice;
