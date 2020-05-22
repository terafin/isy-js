import { EventType } from './EventType';
import { NodeEvent } from './NodeEvent';
class PropertyChangedEvent extends NodeEvent<string, EventType.PropertyChanged> {
	property: string;
	formattedValue: string;
	constructor (eventData: any) {
		super(eventData);
		this.property = eventData.control;
		this.formattedValue = eventData.fmtAct;
	}
}
