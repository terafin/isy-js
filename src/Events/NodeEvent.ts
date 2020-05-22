import { ISYEvent } from './ISYEvent';
import { t } from '../Families';
export class NodeEvent<TActionType, TEventType extends t> extends ISYEvent<TActionType, TEventType> {
	nodeAddress: string;
	constructor (eventData: any) {
		super(eventData);
		this.nodeAddress = eventData.node;
	}
}
