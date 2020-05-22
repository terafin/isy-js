Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYEvent = void 0;
class ISYEvent {
    constructor(eventData) {
        this.action = eventData.action;
        this.eventInfo = eventData.eventInfo;
    }
}
exports.ISYEvent = ISYEvent;
