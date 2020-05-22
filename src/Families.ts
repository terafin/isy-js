import { ISYUpdateableBinaryStateDevice } from './Devices/ISYDevice';
import { InsteonBaseDevice } from './ISY';
import { EventType } from './Events/EventType';
import { ISYEvent } from './Events/ISYEvent';


export enum Family {
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

class GenericEvent extends ISYEvent<string, EventType>
{

}

export type t = EventType.NodeChanged | EventType.PropertyChanged | EventType.ZWave | EventType.ZigBee;
