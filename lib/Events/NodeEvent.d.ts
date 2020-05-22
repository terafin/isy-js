import { ISYEvent } from './ISYEvent';
import { t } from '../Families';
export declare class NodeEvent<TActionType, TEventType extends t> extends ISYEvent<TActionType, TEventType> {
    nodeAddress: string;
    constructor(eventData: any);
}
