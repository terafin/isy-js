Object.defineProperty(exports, "__esModule", { value: true });
exports.Family = void 0;
const ISYEvent_1 = require("./Events/ISYEvent");
var Family;
(function (Family) {
    Family[Family["Elk"] = 0] = "Elk";
    Family[Family["Insteon"] = 1] = "Insteon";
    Family[Family["UPB"] = 2] = "UPB";
    Family[Family["ZigBee"] = 3] = "ZigBee";
    Family[Family["ZWave"] = 4] = "ZWave";
    Family[Family["AutoDR"] = 5] = "AutoDR";
    Family[Family["Scene"] = 6] = "Scene";
    Family[Family["UDI"] = 7] = "UDI";
    Family[Family["Brultech"] = 8] = "Brultech";
    Family[Family["NCD"] = 9] = "NCD";
    Family[Family["Poly"] = 10] = "Poly";
})(Family = exports.Family || (exports.Family = {}));
class GenericEvent extends ISYEvent_1.ISYEvent {
}
