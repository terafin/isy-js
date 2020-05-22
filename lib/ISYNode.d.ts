/// <reference types="node" />
import { EventEmitter } from 'events';
import { Family } from './Families';
import { ISY, NodeType } from './ISY';
import { PropertyChangedEventEmitter } from './Utils';
export declare class ISYNode extends EventEmitter implements PropertyChangedEventEmitter {
    readonly isy: ISY;
    readonly flag: any;
    readonly nodeDefId: string;
    readonly address: string;
    [x: string]: any;
    name: string;
    displayName: string;
    spokenName: string;
    location: string;
    isLoad: boolean;
    folder: string;
    parent: any;
    parentType: NodeType;
    readonly elkId: string;
    nodeType: number;
    readonly baseDisplayName: string;
    propsInitialized: boolean;
    logger: (msg: any) => void;
    lastChanged: Date;
    enabled: boolean;
    constructor(isy: ISY, node: {
        flag?: any;
        nodeDefId?: string;
        address?: string;
        name?: string;
        family?: Family;
        parent?: any;
        enabled: boolean;
        ELK_ID?: string;
    });
    handlePropertyChange(propertyName: string, value: any, formattedValue: string): boolean;
    handleControlTrigger(controlName: string): boolean;
    on(event: 'PropertyChanged' | 'ControlTriggered', listener: ((propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any) | ((controlName: string) => any)): this;
    emit(event: 'PropertyChanged' | 'ControlTriggered', propertyName?: string, newValue?: any, oldValue?: any, formattedValue?: string, controlName?: string): boolean;
    handleEvent(event: any): boolean;
    static _displayNameFunction: Function;
    setDisplayName(template: string): string;
    refreshNotes(): Promise<void>;
    getNotes(): Promise<any>;
}
