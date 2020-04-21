import { timingSafeEqual } from 'crypto';
import { isNullOrUndefined } from 'util';

import { Family } from '../Families';
import { Controls, ISY } from '../ISY';
import { Commands, States } from '../ISYConstants';
import { ISYNode } from '../ISYNode';
import { ISYScene } from '../ISYScene';
import { threadId } from 'worker_threads';

export class ISYDevice<T extends Family> extends ISYNode {
	public family: T;
	public readonly typeCode: string;
	public readonly deviceClass: any;
	public readonly parentAddress: any;
	public readonly category: number;
	public readonly subCategory: number;
	public readonly type: any;
	public _parentDevice: ISYDevice<T>;
	public readonly children: ISYDevice<T>[] = [];
	public readonly scenes: ISYScene[] = [];
	public readonly formatted: any[string] = {};
	public readonly uom: any[string] = {};
	public readonly pending: any[string] = {};
	public hidden: boolean = false;
	public location: string;

	constructor (isy: ISY, node: { family: any; type?: any; enabled: any; deviceClass?: any; pnode?: any; property?: any; flag?: any; nodeDefId?: string; address?: string; name?: string; parent?: any; ELK_ID?: string; }) {
		super(isy, node );
		this.family = node.family ?? Family.Generic;
		this.nodeType = 1;
		this.type = node.type;
		this._enabled = node.enabled;
		this.deviceClass = node.deviceClass;
		this.parentAddress = node.pnode;
		const s = this.type.split('.');
		this.category = Number(s[0]);
		this.subCategory = Number(s[1]);

		// console.log(nodeDetail);
		if (
			this.parentAddress !== this.address &&
			this.parentAddress !== undefined
		) {
			this._parentDevice = isy.getDevice(this.parentAddress);
			if (!isNullOrUndefined(this._parentDevice)) {
				this._parentDevice.addChild(this);
			}

		}
		if (Array.isArray(node.property)) {
			for (const prop of node.property) {
				this[prop.id] = this.convertFrom(Number(prop.value), Number(prop.uom));
				this.formatted[prop.id] = prop.formatted;
				this.uom[prop.id] = prop.uom;
				this.logger(
					`Property ${Controls[prop.id].label} (${prop.id}) initialized to: ${
					this[prop.id]
					} (${this.formatted[prop.id]})`
				);
			}
		} else if(node.property){
			this[node.property.id] = this.convertFrom(
				Number(node.property.value),
				Number(node.property.uom)
			);
			this.formatted[node.property.id] = node.property.formatted;
			this.uom[node.property.id] = node.property.uom;
			this.logger(
				`Property ${Controls[node.property.id].label} (${
				node.property.id
				}) initialized to: ${this[node.property.id]} (${
				this.formatted[node.property.id]
				})`
			);
		}

	}

	public convertTo(value: any, uom: number): any {
		return value;
	}

	public convertFrom(value: any, uom: number): any {
		return value;
	}

	public addLink(isyScene: ISYScene) {
		this.scenes.push(isyScene);
	}

	public addChild(childDevice: ISYDevice<T>) {
		this.children.push(childDevice);
	}

	get parentDevice(): ISYDevice<T> {
		if (this._parentDevice === undefined) {
			if (
				this.parentAddress !== this.address &&
				this.parentAddress !== null &&
				this.parentAddress !== undefined
			) {
				this._parentDevice = this.isy.getDevice(this.parentAddress);
				if (this._parentDevice !== null) {
					this._parentDevice.addChild(this);
				}
			}
			this._parentDevice = null;
		}
		return this._parentDevice;
	}

	public async refreshProperty(propertyName: string): Promise<any> {
		return this.isy.callISY(`nodes/${this.address}/status/${propertyName}`);
	}

	public async refreshNotes() {
		const that = this;
		try {

			const result = await this.getNotes();
			if (result !== null && result !== undefined) {
				that.location = result.location;
				that.displayName = (that.location ?? that.folder) + ' ' + result.spoken;
				that.logger('The friendly name updated to: ' + that.displayName);
			}
			else
			{
				that.logger('No notes found.');
			}
		}
		catch (e){

			that.logger(e);
		}

	}

	async getNotes(): Promise<any> {

		try {
			let result = await this.isy.callISY(`nodes/${this.address}/notes`);
			if (result !== null && result !== undefined)
					return result.NodeProperties;
			else
					return null;

		}
		catch (e)
		{
			return null;
		}
	}

	public async updateProperty(propertyName: string, value: string): Promise<any> {
		const val = this.convertTo(Number(value), Number(this.uom[propertyName]));
		this.logger(
			`Updating property ${Controls[propertyName].label}. incoming value: ${value} outgoing value: ${val}`
		);
		this.pending[propertyName] = value;
		return this.isy
			.sendISYCommand(`nodes/${this.address}/set/${propertyName}/${val}`)
			.then((p) => {
				this[propertyName] = value;
				this.pending[propertyName] = null;
			});
	}

	public async sendCommand(command, ...parameters: any[]): Promise<any> {
		return this.isy.sendNodeCommand(this, command, ...parameters);
	}

	public async refresh(): Promise<any> {
		const device = this;
		const result = await this.isy.callISY(`nodes/${this.address}/status`);
		const node = result.node;
		// this.logger(node);

		if (Array.isArray(node.property)) {
			for (const prop of node.property) {
				device[prop.id] = Number(prop.value);
				device.formatted[prop.id] = prop.formatted;
				device.uom[prop.id] = prop.uom;
				device.logger(
					`Property ${Controls[prop.id].label} (${prop.id}) refreshed to: ${
					device[prop.id]
					} (${device.formatted[prop.id]})`
				);
			}
		} else {
			device[node.property.id] = Number(node.property.value);
			device.formatted[node.property.id] = node.property.formatted;
			device.uom[node.property.id] = node.property.uom;
			device.logger(
				'Property ' + Controls[node.property.id].label + ' (' + node.property.id + ') refreshed to: ' + device[node.property.id] + ' (' + device.formatted[node.property.id] + ')'
			);
		}
		return result;
	}

	public handlePropertyChange(propertyName: string, value: any, formattedValue: string) {
		let changed = false;
		let priorVal = this[propertyName];
		try {
			const val = this.convertFrom(
				Number(value),
				Number(this.uom[propertyName])
			);

			if (this[propertyName] !== val) {

				this.logger(
					`Property ${
					Controls[propertyName].label
					} (${propertyName}) updated to: ${val} (${formattedValue})`
				);
				this[propertyName] = val;
				this.formatted[propertyName] = formattedValue;
				this.lastChanged = new Date();
				changed = true;
			} else {
				this.logger(
					`Update event triggered, property ${
					Controls[propertyName].label
					} (${propertyName}) is unchanged.`
				);
			}
			if (changed) {
				this.emit('PropertyChanged',propertyName,val,priorVal,formattedValue);
				this.propertyChanged.emit(
					propertyName,
					propertyName,
					val,
					formattedValue
				);
				this.propertyChanged.emit('', propertyName, val, formattedValue);

				this.scenes.forEach((element) => {
					this.logger('Recalulating ' + element.name);
					element.recalculateState();
				});
			}
		} finally {
			return changed;
		}
	}
}

type Constructor<T> = new (...args: any[]) => T;

export const ISYBinaryStateDevice = <T extends Constructor<ISYDevice<any>>>(
	Base: T
) => {
	return class extends Base {
		get state(): boolean {
			return this.ST > 0;
		}



		public async updateState(state: boolean): Promise<any> {
			if (state !== this.state || this.pending.ST > 0 !== this.state) {
				this.pending.ST = state ? States.On : States.Off;
				return this.sendCommand(state ? Commands.On : Commands.Off).then((p) => {
					this.ST = this.pending.ST;
					this.pending.ST = null;
				});
			}
			return Promise.resolve({});
		}
	};
};

// tslint:disable-next-line: variable-name
export const ISYLevelDevice = <T extends Constructor<ISYDevice<any>>>(base: T) =>
	class extends base {
		get level(): number {
			return this.ST;
		}

		public async updateLevel(level: number): Promise<any> {
			if (level !== this.ST || level !== this.pending.ST) {

				this.pending.ST = level;
				if (level > 0) {
					return this.sendCommand(
						Commands.On,
						this.convertTo(level, Number(this.uom.ST))
					).then((p) => {
						this.ST = this.pending.ST;
						this.pending.ST = null;
					});
				} else {
					return this.sendCommand(Commands.Off).then((p) => {
						this.ST = this.pending.ST;
						this.pending.ST = null;
					});
				}
			}
			return Promise.resolve({});
		}
	};