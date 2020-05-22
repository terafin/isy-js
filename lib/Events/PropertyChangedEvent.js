Object.defineProperty(exports, "__esModule", { value: true });
const NodeEvent_1 = require("./NodeEvent");
class PropertyChangedEvent extends NodeEvent_1.NodeEvent {
    constructor(eventData) {
        super(eventData);
        this.property = eventData.control;
        this.formattedValue = eventData.fmtAct;
    }
}
