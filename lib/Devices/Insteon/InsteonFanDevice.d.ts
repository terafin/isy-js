/// <reference types="node" />
import { Family } from '../../Families';
import { ISY } from '../../ISY';
import { ISYDevice } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';
import { InsteonDimmableDevice } from './InsteonDimmableDevice';
declare const InsteonFanMotorDevice_base: {
    new (...args: any[]): {
        [x: string]: any;
        readonly level: number;
        updateLevel(level: number): Promise<any>;
        family: any;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly parentAddress: any;
        readonly category: number;
        readonly subCategory: number;
        readonly type: any;
        _parentDevice: ISYDevice<any>;
        readonly children: ISYDevice<any>[];
        readonly scenes: import("../../ISYScene").ISYScene[];
        readonly formatted: any;
        readonly uom: any;
        readonly pending: any;
        hidden: boolean;
        location: string;
        convertTo(value: any, uom: number): any;
        convertFrom(value: any, uom: number): any;
        addLink(isyScene: import("../../ISYScene").ISYScene): void;
        addChild(childDevice: ISYDevice<any>): void;
        readonly parentDevice: ISYDevice<any>;
        refreshProperty(propertyName: string): Promise<any>;
        refreshNotes(): Promise<void>;
        getNotes(): Promise<any>;
        updateProperty(propertyName: string, value: string): Promise<any>;
        sendCommand(command: any, ...parameters: any[]): Promise<any>;
        refresh(): Promise<any>;
        handlePropertyChange(propertyName: string, value: any, formattedValue: string): boolean;
        readonly isy: ISY;
        readonly flag: any;
        readonly nodeDefId: string;
        readonly address: string;
        name: string;
        displayName: string;
        folder: string;
        parent: any;
        parentType: import("../../ISYConstants").NodeType;
        readonly elkId: string;
        nodeType: number;
        propertyChanged: import("events").EventEmitter;
        propsInitialized: boolean;
        logger: (msg: any) => void;
        lastChanged: Date;
        enabled: boolean;
        on(event: "PropertyChanged", listener: (propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any): any;
        emit(event: "PropertyChanged", propertyName: string, newValue: any, oldValue: any, formattedValue: string): boolean;
        handleEvent(event: any): boolean;
        onPropertyChanged(propertyName: any, callback: (...args: any[]) => void): void;
        addListener(event: string | symbol, listener: (...args: any[]) => void): any;
        once(event: string | symbol, listener: (...args: any[]) => void): any;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): any;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): any;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): any;
        off(event: string | symbol, listener: (...args: any[]) => void): any;
        removeAllListeners(event?: string | symbol): any;
        setMaxListeners(n: number): any;
        getMaxListeners(): number;
        listeners(event: string | symbol): Function[];
        rawListeners(event: string | symbol): Function[];
        eventNames(): (string | symbol)[];
        listenerCount(type: string | symbol): number;
    };
} & {
    new (...args: any[]): {
        [x: string]: any;
        readonly state: boolean;
        updateState(state: boolean): Promise<any>;
        family: any;
        readonly typeCode: string;
        readonly deviceClass: any;
        readonly parentAddress: any;
        readonly category: number;
        readonly subCategory: number;
        readonly type: any;
        _parentDevice: ISYDevice<any>;
        readonly children: ISYDevice<any>[];
        readonly scenes: import("../../ISYScene").ISYScene[];
        readonly formatted: any;
        readonly uom: any;
        readonly pending: any;
        hidden: boolean;
        location: string;
        convertTo(value: any, uom: number): any;
        convertFrom(value: any, uom: number): any;
        addLink(isyScene: import("../../ISYScene").ISYScene): void;
        addChild(childDevice: ISYDevice<any>): void;
        readonly parentDevice: ISYDevice<any>;
        refreshProperty(propertyName: string): Promise<any>;
        refreshNotes(): Promise<void>;
        getNotes(): Promise<any>;
        updateProperty(propertyName: string, value: string): Promise<any>;
        sendCommand(command: any, ...parameters: any[]): Promise<any>;
        refresh(): Promise<any>;
        handlePropertyChange(propertyName: string, value: any, formattedValue: string): boolean;
        readonly isy: ISY;
        readonly flag: any;
        readonly nodeDefId: string;
        readonly address: string;
        name: string;
        displayName: string;
        folder: string;
        parent: any;
        parentType: import("../../ISYConstants").NodeType;
        readonly elkId: string;
        nodeType: number;
        propertyChanged: import("events").EventEmitter;
        propsInitialized: boolean;
        logger: (msg: any) => void;
        lastChanged: Date;
        enabled: boolean;
        on(event: "PropertyChanged", listener: (propertyName: string, newValue: any, oldValue: any, formattedValue: string) => any): any;
        emit(event: "PropertyChanged", propertyName: string, newValue: any, oldValue: any, formattedValue: string): boolean;
        handleEvent(event: any): boolean;
        onPropertyChanged(propertyName: any, callback: (...args: any[]) => void): void;
        addListener(event: string | symbol, listener: (...args: any[]) => void): any;
        once(event: string | symbol, listener: (...args: any[]) => void): any;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): any;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): any;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): any;
        off(event: string | symbol, listener: (...args: any[]) => void): any;
        removeAllListeners(event?: string | symbol): any;
        setMaxListeners(n: number): any;
        getMaxListeners(): number;
        listeners(event: string | symbol): Function[];
        rawListeners(event: string | symbol): Function[];
        eventNames(): (string | symbol)[];
        listenerCount(type: string | symbol): number;
    };
} & typeof InsteonBaseDevice;
export declare class InsteonFanMotorDevice extends InsteonFanMotorDevice_base {
    constructor(isy: ISY, deviceNode: {
        type: string;
    });
    get isOn(): boolean;
    get fanSpeed(): number;
    updateFanSpeed(level: number): Promise<any>;
    updateIsOn(isOn: boolean): Promise<void>;
}
export declare class InsteonFanDevice extends InsteonBaseDevice {
    light: InsteonDimmableDevice;
    motor: InsteonFanMotorDevice;
    constructor(isy: ISY, deviceNode: {
        type: string;
    });
    handleEvent(event: any): boolean;
    addChild(childDevice: ISYDevice<Family.Insteon>): void;
    updateFanSpeed(level: number): Promise<any>;
    updateIsOn(isOn: boolean): Promise<void>;
}
export {};