Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceFactory = void 0;
const ISY_1 = require("../ISY");
const InsteonDeviceFactory_1 = require("./Insteon/InsteonDeviceFactory");
class DeviceFactory {
    static getDeviceDetails(node) {
        var _a;
        // tslint:disable-next-line: triple-equals
        if (((_a = node.family) !== null && _a !== void 0 ? _a : ISY_1.Family.Insteon) == ISY_1.Family.Insteon) {
            return InsteonDeviceFactory_1.InsteonDeviceFactory.getInsteonDeviceDetails(node.type, node);
        }
        else {
            return { name: 'Unsupported Device', class: ISY_1.ISYDevice, unsupported: true };
        }
    }
}
exports.DeviceFactory = DeviceFactory;
