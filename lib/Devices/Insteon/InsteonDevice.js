Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonOutletDevice = exports.KeypadDevice = exports.InsteonSwitchDevice = exports.InsteonLampDevice = void 0;
const InsteonRelayDevice_1 = require("./InsteonRelayDevice");
exports.InsteonLampDevice = (IB) => (class extends IB {
    constructor(...args) {
        super(args[0], args[1]);
        this.isDimmable = true;
    }
});
// tslint:disable-next-line: variable-name
exports.InsteonSwitchDevice = (IB) => (class extends IB {
    constructor(...args) {
        super(args[0], args[1]);
        this.isDimmable = true;
    }
});
exports.KeypadDevice = (IB) => (class extends IB {
    addChild(childDevice) {
        super.addChild(childDevice);
    }
});
class InsteonOutletDevice extends InsteonRelayDevice_1.InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonOutletDevice = InsteonOutletDevice;
