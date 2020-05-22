import { EventType } from './Events/EventType';
export declare enum Family {
    Elk = 0,
    Insteon = 1,
    UPB = 2,
    ZigBee = 3,
    ZWave = 4,
    AutoDR = 5,
    Scene = 6,
    UDI = 7,
    Brultech = 8,
    NCD = 9,
    Poly = 10
}
export interface Insteon {
    family: Family.Insteon;
}
export declare type t = EventType.NodeChanged | EventType.PropertyChanged | EventType.ZWave | EventType.ZigBee;
