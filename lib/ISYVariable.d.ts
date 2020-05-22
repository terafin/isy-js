/// <reference types="node" />
import { EventEmitter } from 'events';
import { ISY } from './ISY';
import { VariableType } from './ISYConstants';
export declare class ISYVariable extends EventEmitter {
    isy: ISY;
    id: number;
    name: string;
    value: any;
    init: any;
    type: VariableType;
    lastChanged: Date;
    constructor(isy: ISY, id: number, name: string, type: any);
    handleEvent(event: {
        eventInfo: {
            var: any;
        };
    }): void;
    updateValue(value: any): Promise<void>;
}
