Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeEvent = void 0;
const ISYEvent_1 = require("./ISYEvent");
class NodeEvent extends ISYEvent_1.ISYEvent {
    constructor(eventData) {
        super(eventData);
        this.nodeAddress = eventData.node;
    }
}
exports.NodeEvent = NodeEvent;
