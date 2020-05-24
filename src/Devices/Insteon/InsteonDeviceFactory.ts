import { format } from 'util';
import { parseStringPromise } from 'xml2js';

import { Categories } from '../../Categories';
import { InsteonLampDevice, InsteonSwitchDevice, KeypadDevice } from './InsteonDevice';
import { InsteonDimmableDevice } from './InsteonDimmableDevice';
import { InsteonDimmerOutletDevice } from './InsteonDimmerOutletDevice';
import { InsteonDimmerSwitchDevice } from './InsteonDimmerSwitchDevice';
import { InsteonDoorWindowSensorDevice } from './InsteonDoorWindowSensorDevice';
import { InsteonFanDevice, InsteonFanMotorDevice } from './InsteonFanDevice';
import { InsteonKeypadButtonDevice } from './InsteonKeypadDevice';
import { InsteonKeypadDimmerDevice } from './InsteonKeypadDimmerDevice';
import { InsteonKeypadRelayDevice } from './InsteonKeypadRelayDevice';
import { InsteonLeakSensorDevice } from './InsteonLeakSensorDevice';
import { InsteonMotionSensorDevice } from './InsteonMotionSensorDevice';
import { InsteonOnOffOutletDevice } from './InsteonOnOffOutletDevice';
import { InsteonRelayDevice } from './InsteonRelayDevice';
import { InsteonRelaySwitchDevice } from './InsteonRelaySwitchDevice';
import { Family, InsteonBaseDevice, InsteonLockDevice, InsteonSmokeSensorDevice, InsteonThermostatDevice, ISYDevice, ISYNode } from '../../ISY';
import { parseTypeCode } from '../../Utils';
import { ISYBinaryStateDevice } from '../ISYDevice';

type l = ISYDevice<Family>;

export class InsteonDeviceFactory {

	public static getDeviceDetails(node: { family?: any; type?: any; address?: any; nodeDefId: any; }): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; unsupported?: true } {
		const family = Number(node.family ?? '1');

		if ((family ?? Family.Insteon) === Family.Insteon) {

			return this.getInsteonDeviceDetails(node.type, node);

		} else { return {name: 'Unsupported Device', class: ISYDevice, unsupported: true} }
	}

	public static getInsteonDeviceDetails(typeCode: string, node: { address?: any; nodeDefId: any; }): { name: string; modelNumber?: string; version?: string; class: typeof ISYDevice; unsupported? : true } {
		const type = parseTypeCode(typeCode);
		const subAddress = node.address.split(' ').pop();

		// const typeArray = typeCode.split('.');
		const category = type.category;
		const deviceCode = type.deviceCode;

		let deviceDetails = null;
		if (category === Categories.Controller) {
			deviceDetails = InsteonDeviceFactory.getNLSControllerInfo(deviceCode);
		} else if (category === 0o001) {
			deviceDetails = InsteonDeviceFactory.getNLSDimLightInfo(deviceCode, subAddress, node);
		} else if (category === 0o002) {
			deviceDetails = InsteonDeviceFactory.getNLSSwitchLightInfo(deviceCode, subAddress);
		} else if (category === 0o003) {
			deviceDetails = InsteonDeviceFactory.getNLSNetworkBridgeInfo(deviceCode);
		} else if (category === 0o005) {
			deviceDetails = InsteonDeviceFactory.getNLSClimateControlInfo(deviceCode);
		} else if (category === 0o004) {
			deviceDetails = InsteonDeviceFactory.getNLSIrrigationControlInfo(deviceCode);
		} else if (category === 0o007) {
			deviceDetails = InsteonDeviceFactory.getNLSIOControlInfo(deviceCode);
		} else if (category === 0o017) {
			deviceDetails = InsteonDeviceFactory.getNLSAccessControlInfo(deviceCode);
		} else if (category === 0o020) {
			deviceDetails = InsteonDeviceFactory.getNLSSHS(deviceCode,subAddress,node);
		} else if (category === 0o011) {
			deviceDetails = InsteonDeviceFactory.getNLSEnergyManagement(deviceCode);
		} else if (category === 0o016) {
			deviceDetails = InsteonDeviceFactory.getNLSWindowsCovering(deviceCode);
		}
		if (deviceDetails) {
			deviceDetails.version = type.firmwareVersion;
			if (deviceDetails.class === InsteonOnOffOutletDevice && subAddress !== '1') {
				deviceDetails.class = InsteonRelayDevice;
			}
		}
		if(!deviceDetails)
			deviceDetails =
				{ name: 'Unsupported Insteon Device', class: null, unsupported: true};
		if(!deviceDetails.class)
			deviceDetails.class = InsteonBaseDevice;
		return deviceDetails;

		// deviceDetails = deviceDetails + version.toString(16);

	}

	public static getNLSNetworkBridgeInfo(deviceCode: number): { name: string; modelNumber: string; version: string; class: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		let retVal = null;
		switch (c) {
			case String.fromCharCode(0o001):
				retVal = { name: 'PowerLinc Serial', modelNumber: '2414S' };
				break;
			case String.fromCharCode(0o002):
				retVal = { name: 'PowerLinc USB', modelNumber: '2414U' };
				break;
			case String.fromCharCode(0o003):
				retVal = { name: 'Icon PowerLinc Serial', modelNumber: '2814S' };
				break;
			case String.fromCharCode(0o004):
				retVal = { name: 'Icon PowerLinc USB', modelNumber: '2814U' };
				break;
			case String.fromCharCode(0o005):
				retVal = { name: 'PowerLine Modem', modelNumber: '2412S' };
				break;
			case String.fromCharCode(0o006):
				retVal = { name: 'IRLinc Receiver', modelNumber: '2411R' };
				break;
			case String.fromCharCode(0o007):
				retVal = { name: 'IRLinc Transmitter', modelNumber: '2411T' };
				break;
			case String.fromCharCode(0o013):
				retVal = { name: 'PowerLine Modem USB', modelNumber: '2412U' };
				break;
			case '\r':
				retVal = {name: 'EZX10-RF'};
				break;
			case String.fromCharCode(0o017):
				retVal = {
					name:  'EZX10-IR'};
				break;
			case 'O':
				retVal = { name: 'PowerLine Modem', modelNumber: '12237DB' };
		}
		return retVal;
	}

	public static getNLSIrrigationControlInfo(deviceCode: number): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		return c === String.fromCharCode(0o000) ? { name: 'EZRain/EZFlora Irrigation Controller' } : null;
	}

	public static getNLSSwitchLightInfo(deviceCode: number, subAddress: string): { name: string; modelNumber?: string; version?: string; class?: typeof InsteonBaseDevice;} {
		const c = String.fromCharCode(deviceCode);
		let retVal = { name: 'Generic Insteon Relay', class: InsteonRelayDevice} as { name: string; modelNumber?: string; version?: string; class?: typeof InsteonBaseDevice; };
		switch (c) {
			case String.fromCharCode(0o006):
				retVal = { name: 'ApplianceLinc - Outdoor Plugin Module', modelNumber: '2456S3E' };
				break;
			case String.fromCharCode(0o007):
				retVal = { name: 'TimerLinc', modelNumber: '2456S3T' };
				break;
			case '\t':
				retVal = { name: 'ApplianceLinc', modelNumber: '2456S3' };
				break;
			case '\n':
				retVal = { name: 'SwitchLinc Relay', modelNumber: '2476ST', class: InsteonRelaySwitchDevice};
				break;
			case String.fromCharCode(0o013):
				retVal.class = InsteonRelaySwitchDevice;
				break;
			case '\f':
				retVal = { name: 'Icon Appliance Adapter', modelNumber: '2856S3' };
				break;
			case '\r':
				break;
			case String.fromCharCode(0o032):
				retVal = { name: 'ToggleLinc Relay', modelNumber: '2466S', class: InsteonRelaySwitchDevice};
				break;
			case String.fromCharCode(0o016):
				break;
			case ')':
				retVal = { name: 'SwitchLinc Relay Timer', modelNumber: '2476ST', class: InsteonRelaySwitchDevice};
				break;
			case String.fromCharCode(0o021):
				// return 'EZSwitch30';
				break;
			case String.fromCharCode(0o017):
				retVal = { name: 'KeypadLinc Relay', modelNumber: '2486S/WH6', class: InsteonKeypadRelayDevice };
				break;
			case String.fromCharCode(0o005):
				retVal = { name: 'KeypadLinc Relay (8 buttons)', modelNumber: '2486S/WH8', class: InsteonKeypadRelayDevice };
				break;
			case String.fromCharCode(0o020):
				retVal = { name: 'In-LineLinc Relay', modelNumber: '2475S' };
				break;
			case String.fromCharCode(0o024):
				retVal = { name: 'In-LineLinc Relay W/ Sense', modelNumber: 'B2475S' };
				break;
			case String.fromCharCode(0o023):
				retVal = { name: 'Icon SwitchLinc Relay for Bell Canada', modelNumber: 'B2475S' };
				break;
			case '\b':
				retVal = { name: 'OutletLinc', modelNumber: '2473', class: InsteonOnOffOutletDevice };
				break;
			case String.fromCharCode(0o022):
				retVal = { name: 'Companion Switch', modelNumber: '2474S', class: InsteonRelaySwitchDevice};
				break;
			case String.fromCharCode(0o025):
				retVal = { name: 'SwitchLinc Relay W/ Sense', modelNumber: '2476S', class: InsteonRelaySwitchDevice};
				break;
			case String.fromCharCode(0o027):
				retVal = { name: 'Icon Relay 3-Pin', modelNumber: '2856S3B', class: InsteonRelaySwitchDevice };
				break;
			case String.fromCharCode(0o026):
				retVal = { name: ' Icon Relay Switch', modelNumber: '2876SB' , class: InsteonRelaySwitchDevice};
				break;
			case String.fromCharCode(0o030):
				retVal = { name: 'SwitchLinc Relay 220 V.', modelNumber: '2494S220', class: InsteonRelaySwitchDevice};
				break;
			case String.fromCharCode(0o031):
				retVal = { name: 'SwitchLinc Relay 220 V. w/Beeper', modelNumber: '2494S220', class: InsteonRelaySwitchDevice };
				break;
			case String.fromCharCode(0o034):
				retVal = { name: 'SwitchLinc Relay - Remote Control On/Off Switch', modelNumber: '2476S', class: InsteonRelaySwitchDevice };
				break;
			case '%':
				retVal = { name: 'KeypadLinc Timer Relay (8 buttons)', modelNumber: '2484S/WH8', class: InsteonKeypadRelayDevice };
				break;
			case ' ':
				retVal = { name: 'KeypadLinc Relay', modelNumber: '2486S/WH6-SP', class: InsteonKeypadRelayDevice };
				break;
			case '!':
				retVal = { name: 'OutletLinc', modelNumber: '2473-SP', class: InsteonOnOffOutletDevice };
				break;
			case '#':
				return { name: 'SwitchLinc Relay - Remote Control On/Off Switch', modelNumber: '2476S-SP', class: InsteonRelaySwitchDevice };
				break;
			case '"':
				retVal = { name: 'In-LineLinc Relay', modelNumber: '2475S-SP', class: InsteonRelaySwitchDevice };
				break;
			case String.fromCharCode(0o036):
				break;
			case ',':
				retVal = { name: 'Dual Band KeypadLinc Relay', modelNumber: '2487S', class: InsteonKeypadRelayDevice };
				break;
			case String.fromCharCode(0o037):
				retVal = { name: 'Dual Band InlineLinc On/Off Switch', modelNumber: '2475SDB', class: InsteonRelaySwitchDevice };
				break;
			case '*':
				retVal = { name: 'Dual Band SwitchLinc On/Off Switch', modelNumber: '2477S', class: InsteonRelaySwitchDevice };
				break;
			case '/':
				retVal = { name: 'Micro Module On/Off', modelNumber: '2443-222' };
				break;
			case '1':
				retVal = { name: 'Micro Module On/Off', modelNumber: '2443-422' };
				break;
			case '2':
				break;
			case '<':
				retVal = { name: 'Micro Module On/Off', modelNumber: '2443-522' };
				break;
			case '.':
				retVal = { name: 'Din Rail Relay', modelNumber: '2453-222', class: InsteonRelaySwitchDevice };
				break;
			case '3':
				retVal = { name: 'Din Rail Relay', modelNumber: '2453-422', class: InsteonRelaySwitchDevice };
				break;
			case '4':
				break;
			case '=':
				retVal = { name: 'Din Rail Relay', modelNumber: '2453-522', class: InsteonRelaySwitchDevice };
				break;
			case '7':
				retVal = { name: 'On/Off Module', modelNumber: '2635-222', };
				break;
			case '8':
				retVal = { name: 'On/Off Outdoor Module', modelNumber: '2634-222' };
				break;
			case '9':
				retVal = { name: 'On/Off Outlet', modelNumber: '2663-222' };
				break;
			case '-':
				retVal = { name: 'Plugin Relay', modelNumber: '2633-422' };
				break;
			case '0':
				retVal = { name: 'Plugin Relay', modelNumber: '2633-432' };
				break;
			case '5':
				retVal = { name: 'Plugin Relay', modelNumber: '2633-442' };
				break;
			case '6':
				retVal = { name: 'Plugin Relay', modelNumber: '2633-522' };
		}
		if (subAddress != '1' && retVal.class === InsteonKeypadRelayDevice) {
			retVal.class = InsteonKeypadButtonDevice;
		}
		if (retVal.class === undefined) { retVal.class = InsteonRelayDevice; }
		return retVal;
	}

	private static getNLSDimLightInfo(deviceCode: number, subAddress: string, node: { nodeDefId: string; }) : { name: string; modelNumber ?: string; version ?: string; class?: typeof InsteonBaseDevice; }{
		const c = String.fromCharCode(deviceCode);
		let retVal = { name: 'Generic Insteon Dimmer', class: InsteonDimmableDevice } as { name: string; modelNumber?: string; version?: string; class?: typeof InsteonBaseDevice; };
		switch (c) {
			case String.fromCharCode(0o000):
				retVal = { name: 'LampLinc', modelNumber: '2456D3' };
				break;
			case String.fromCharCode(0o001):
				retVal = { name: 'SwitchLinc Dimmer', modelNumber: '2476D', class: InsteonDimmerSwitchDevice };
				break;
			case String.fromCharCode(0o002):
				retVal = { name: 'In-LineLinc Dimmable', modelNumber: '2475D' };
				break;
			case String.fromCharCode(0o003):
				retVal = { name: 'Icon Switch Dimmer', modelNumber: '2876D3' };
				break;
			case String.fromCharCode(0o004):
				retVal = { name: 'SwitchLinc Dimmer', modelNumber: '2476DH', class: InsteonDimmerSwitchDevice };
				break;
			case String.fromCharCode(0o006):
				retVal = { name: 'LampLinc 2 Pin', modelNumber: '2456D2' };
				break;
			case '\t':
				retVal = { name: 'KeypadLinc Dimmer', modelNumber: '2486D' };
				break;
			case String.fromCharCode(0o007):
				retVal = { name: 'Icon LampLinc 2 Pin', modelNumber: '2856D2' };
				break;
			case '\n':
				retVal = { name: 'Icon In-Wall Controller', modelNumber: '2886D' };
				break;
			case '\r':
				retVal = { name: 'SocketLinc', modelNumber: '2454D' };
				break;
			case '\f':
				retVal = { name: 'KeypadLinc Dimmer 8 Button', modelNumber: '2486DWH8', class: InsteonKeypadDimmerDevice };
				break;
			case String.fromCharCode(0o023):
				retVal = { name: 'Icon SwitchLinc Dimmer for Bell Canada' };
				break;
			case String.fromCharCode(0o027):
				break;
			case String.fromCharCode(0o037):
				retVal = { name: 'ToggleLinc Dimmer', modelNumber: '2466D', class: InsteonDimmerSwitchDevice };
				break;
			case String.fromCharCode(0o030):
				retVal = { name: 'Companion Dimmer', modelNumber: '2474D' };
				break;
			case String.fromCharCode(0o032):
				retVal = { name: 'InlineLinc Dimmer', modelNumber: '2475D', class: InsteonDimmerSwitchDevice };
				break;
			case String.fromCharCode(0o005):
				retVal = { name: 'KeypadLinc Countdown Timer', modelNumber: '2484DWH8' };
				break;
			case String.fromCharCode(0o033):
				retVal = { name: 'KeypadLinc Dimmer 6 Buttons', modelNumber: '2486D', class: InsteonKeypadDimmerDevice };
				break;
			case String.fromCharCode(0o034):

				retVal = { name: 'KeypadLinc Dimmer 8 Buttons', modelNumber: '2486D', class: InsteonKeypadDimmerDevice };
				break;
			case String.fromCharCode(0o031):
				retVal = { name: 'SwitchLinc Dimmer W/Beeper', modelNumber: '2476D' };
				break;
			case String.fromCharCode(0o016):
				retVal = { name: 'LampLinc BiPhy', modelNumber: 'B2457D2' };
				break;
			case String.fromCharCode(0o036):
				retVal = { name: 'Icon Dimmer', modelNumber: '2876DB' };
				break;
			case String.fromCharCode(0o035):
				retVal = { name: 'SwitchLinc Dimmer 1000W', modelNumber: '2476DH', class: InsteonDimmerSwitchDevice };
				break;
			case '"':
				retVal = { name: 'LampLinc 2-Pin Dimmer', modelNumber: '2457D2X' };
				break;
			case 'U':
				retVal = { name: 'Dual Band Switchlinc Dimmer', modelNumber: '2432-622', class: InsteonDimmerSwitchDevice };
				break;
			case ' ':
				retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477D', class: InsteonDimmerSwitchDevice };
				break;
			case '1':
				retVal = { name: 'Dual Band SwitchLinc Dimmer (240V)', modelNumber: '2478D', class: InsteonDimmerSwitchDevice };
				break;
			case '-':
				retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477DH', class: InsteonDimmerSwitchDevice };
				break;
			case '\'':
				retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477D-SP', class: InsteonDimmerSwitchDevice };
				break;
			case '+':
				retVal = { name: 'Dual Band SwitchLinc Dimmer', modelNumber: '2477DH-SP', class: InsteonDimmerSwitchDevice };
				break;
			case ')':
				retVal = { name: 'KeypadLinc Dimmer 8 Buttons', modelNumber: '2486D-SP', class: InsteonDimmerSwitchDevice };
				break;
			case '*':
				retVal = { name: 'LampLinc 2-Pin Dimmer', modelNumber: '2457D2X-SP' };
				break;
			case ',':
				retVal = { name: 'InlineLinc Dimmer', modelNumber: '2475D-SP' };
				break;
			case '%':
				retVal = { name: 'Ballast Dimmer', modelNumber: '2475DA2' };
				break;
			case '=':
				retVal = { name: 'Ballast Dimmer', modelNumber: '2446-422' };
				break;
			case '>':
				retVal = { name: 'Ballast Dimmer', modelNumber: '2446-522' };
				break;
			case '.':

				retVal = { name: 'FanLinc', modelNumber: '2475F', class: InsteonFanDevice };
				break;
			case '!':
				retVal = { name: 'Dual Band OutletLinc Dimmer', modelNumber: '2472D', class: InsteonDimmerOutletDevice };
				break;
			case '0':
				retVal = { name: 'SwitchLinc Dimmer', modelNumber: '2476D', class: InsteonDimmerSwitchDevice };
				break;
			case '$':
				retVal = { name: 'SwitchLinc Dimmer 2-Wire', modelNumber: '2474DWH', class: InsteonDimmerSwitchDevice };
				break;
			case '2':
				retVal = { name: 'InLineLinc Dimmer', modelNumber: '2475DA1' };
				break;
			case ':':
				retVal = { name: 'Insteon LED Bulb 8 Watt (60W)', modelNumber: '2672-222' };
				break;
			case 'I':
				retVal = { name: 'Insteon LED Bulb PAR38 12 Watt', modelNumber: '2674-222' };
				break;
			case '5':
				retVal = { name: 'Micro Module Dimmer', modelNumber: '2442-222' };
				break;
			case '8':
				retVal = { name: 'Micro Module Dimmer', modelNumber: '2442-422' };
				break;
			case '9':
				break;
			case 'S':
				retVal = { name: 'Micro Module Dimmer', modelNumber: '2442-522' };
				break;
			case '4':
				retVal = { name: 'Din Rail Dimmer', modelNumber: '2452-222' };
				break;
			case '6':
				retVal = { name: 'Din Rail Dimmer', modelNumber: '2452-422' };
				break;
			case '7':
				break;
			case 'T':
				retVal = { name: 'Din Rail Dimmer', modelNumber: '2452-522' };
				break;
			case 'B':
				retVal = { name: 'KeypadLinc Dimmer 5 Buttons', modelNumber: '2334-2', class: InsteonKeypadDimmerDevice };
				break;
			case 'A':
				retVal = { name: 'KeypadLinc Dimmer 8 Buttons', modelNumber: '2334-2', class: InsteonKeypadDimmerDevice };
				break;
			case 'V':
				retVal = { name: 'KeypadLinc Dimmer 6 Buttons', modelNumber: '2334-632', class: InsteonKeypadDimmerDevice };
				break;
			case String.fromCharCode(0o013):
				retVal = { name: 'Plugin Dimmer', modelNumber: '2632-422' };
				break;
			case String.fromCharCode(0o017):
				retVal = { name: 'Plugin Dimmer', modelNumber: '2632-432' };
				break;
			case String.fromCharCode(0o021):
				retVal = { name: 'Plugin Dimmer', modelNumber: '2632-442' };
				break;
			case 'P':
				retVal = { name: 'Plugin Dimmer', modelNumber: '2632-452' };
				break;
			case String.fromCharCode(0o022):
				retVal = { name: 'Plugin Dimmer', modelNumber: '2632-522' };
		}
		if (subAddress !== '1' && retVal.class === InsteonKeypadDimmerDevice) {
			retVal.class = InsteonKeypadButtonDevice;
		}
		if(node.nodeDefId === 'FanLincMotor')
		{
			retVal.class = InsteonFanMotorDevice;
		}
		if (retVal?.class === undefined) { retVal.name = 'Generic Insteon Dimmer', retVal.class = InsteonDimmableDevice; }
		return retVal;
	}

	private static getNLSControllerInfo(deviceCode: number): { name: string; modelNumber?: string; version?: string; class: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		let retVal = null;
		switch (c) {
			case String.fromCharCode(0o000):
				retVal = { name: 'ControLinc', modelNumber: '2430' };
				break;
			case String.fromCharCode(0o005):
				retVal = { name: 'RemoteLinc', modelNumber: '2440' };
				break;
			case String.fromCharCode(0o016):
				retVal = { name: 'RemoteLinc EZ', modelNumber: '2440EZ' };
				break;
			case String.fromCharCode(0o006):
				retVal = { name: 'Icon Tabletop', modelNumber: '2830' };
				break;
			case '\t':
				retVal = { name: 'SignaLinc', modelNumber: '2442' };
				break;
			case String.fromCharCode(0o021):
				retVal = { name: 'RemoteLinc 2 Switch', modelNumber: '2342-242' };
				break;
			case String.fromCharCode(0o020):
				retVal = { name: 'RemoteLinc 2 Keypad, 4 Scene', modelNumber: '2342-232' };
				break;
			case String.fromCharCode(0o022):
				retVal = { name: 'RemoteLinc 2 Keypad, 8 Scene', modelNumber: '2342-222' };
				break;
			case String.fromCharCode(0o024):
				retVal = { name: 'Mini Remote Keypad, 4 Scene', modelNumber: '2342-432' };
				break;
			case String.fromCharCode(0o025):
				retVal = { name: 'Mini Remote Switch', modelNumber: '2342-442' };
				break;
			case String.fromCharCode(0o026):
				retVal = { name: 'Mini Remote Keypad, 8 Scene', modelNumber: '2342-422' };
				break;
			case String.fromCharCode(0o027):
				retVal = { name: 'Mini Remote Keypad, 4 Scene', modelNumber: '2342-532' };
				break;
			case String.fromCharCode(0o030):
				retVal = { name: 'Mini Remote Keypad, 8 Scene', modelNumber: '2342-522' };
				break;
			case String.fromCharCode(0o031):
				retVal = { name: 'Mini Remote Switch', modelNumber: '2342-542' };
				break;
			case String.fromCharCode(0o032):
				retVal = { name: 'Mini Remote Keypad, 8 Scene', modelNumber: '2342-222' };
				break;
			case String.fromCharCode(0o033):
				retVal = { name: 'Mini Remote Keypad, 4 Scene', modelNumber: '2342-232' };
				break;
			case String.fromCharCode(0o034):
				retVal = { name: 'Mini Remote Switch', modelNumber: '2342-242' };
		}
		return retVal;
	}

	private static getNLSIOControlInfo(deviceCode: number): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		let retVal = null;
		switch (c) {
			case String.fromCharCode(0o000):
				retVal = { name: 'IOLinc', modelNumber: '2450' };
				break;
			case String.fromCharCode(0o003):
				retVal = { name: 'Compacta EZIO 2x4: INSTEON I/O Controller' };
				break;
			case String.fromCharCode(0o004):
				retVal = {
					name: 'Compacta EZIO8SA: INSTEON I/O Controller'
				};
				break;
			case String.fromCharCode(0o002):
				retVal = {
					name: 'Compacta EZIO8T: INSTEON I/O Controller'
				};
				break;
			case String.fromCharCode(0o005):
				retVal = {
					name: 'Compacta EZSnSRF'
				};
				break;
			case String.fromCharCode(0o006):
				retVal = {
					name: 'Compacta EZSnSRF Interface'
				};
				break;
			case String.fromCharCode(0o007):
				retVal = {
					name: 'Compacta EZIO6I'
				};
				break;
			case '\b':
				retVal = {
					name: 'Compacta EZIO4O'
				};
				break;
			case '\t':
				retVal = { name: 'SynchroLinc', modelNumber: '2423A5' };
				break;
			case '\r':
				retVal = { name: 'IOLinc (Refurbished)', modelNumber: '2450' };
				break;
			case String.fromCharCode(0o016):
				retVal = { name: 'I/O Module', modelNumber: '2248-222' };
				break;
			case String.fromCharCode(0o017):
				retVal = { name: 'I/O Module', modelNumber: '2248-422' };
				break;
			case String.fromCharCode(0o020):
				retVal = { name: 'I/O Module', modelNumber: '2248-442' };
				break;
			case String.fromCharCode(0o021):
				retVal = { name: 'I/O Module', modelNumber: '2248-522' };
				break;
			case String.fromCharCode(0o022):
				retVal = { name: 'IOLinc', modelNumber: '2822-222' };
				break;
			case String.fromCharCode(0o023):
				retVal = { name: 'IOLinc', modelNumber: '2822-422' };
				break;
			case String.fromCharCode(0o024):
				retVal = { name: 'IOLinc', modelNumber: '2822-442' };
				break;
			case String.fromCharCode(0o025):
				retVal = { name: 'IOLinc', modelNumber: '2822-522' };
				break;
			case String.fromCharCode(0o026):
				retVal = { name: 'Contact Closure', modelNumber: '2822-222' };
				break;
			case String.fromCharCode(0o027):
				retVal = { name: 'Contact Closure', modelNumber: '2822-422' };
				break;
			case String.fromCharCode(0o030):
				retVal = { name: 'Contact Closure', modelNumber: '2822-442' };
				break;
			case String.fromCharCode(0o031):
				retVal = { name: 'Contact Closure', modelNumber: '2822-522' };
				break;
			case String.fromCharCode(0o032):
				retVal = { name: 'Alert Module', modelNumber: '2867-222' };
				break;
			case String.fromCharCode(0o036):
				retVal = { name: 'Siren', modelNumber: '2868-222' };
				break;
			case ' ':
				retVal = { name: 'Siren', modelNumber: '2868-622' };
		}
		return retVal;
	}

	private static getNLSSHS(deviceCode: number, subAddress: string, node): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		let retVal = null;
		switch (c) {
			case String.fromCharCode(0o001):
				retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2842-222', class: InsteonMotionSensorDevice };
				break;
			case String.fromCharCode(0o004):
				retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2842-422', class: InsteonMotionSensorDevice };
				break;
			case String.fromCharCode(0o005):
				retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2842-522', class: InsteonMotionSensorDevice };
				break;
			case String.fromCharCode(0o003):
				retVal = { name: 'INSTEON Motion Sensor', modelNumber: '2420M-SP', class: InsteonMotionSensorDevice };
				break;
			case String.fromCharCode(0o002):
				retVal = { name: 'TriggerLinc', modelNumber: '2421', class: InsteonDoorWindowSensorDevice };
				break;
			case '\t':
				retVal = { name: 'Open/Close Sensor', modelNumber: '2843-222', class: InsteonDoorWindowSensorDevice };
				break;
			case String.fromCharCode(0o006):
				retVal = { name: 'Open/Close Sensor', modelNumber: '2843-422', class: InsteonDoorWindowSensorDevice };
				break;
			case String.fromCharCode(0o007):
				break;
			case String.fromCharCode(0o031):
				retVal = { name: 'Open/Close Sensor', modelNumber: '2843-522', class: InsteonDoorWindowSensorDevice };
				break;
			case '\b':
				retVal = { name: 'Leak Sensor', modelNumber: '2852-222', class: InsteonLeakSensorDevice };
				break;
			case '\r':
				retVal = { name: 'Leak Sensor', modelNumber: '2852-422', class: InsteonLeakSensorDevice };
				break;
			case String.fromCharCode(0o016):
				break;
			case String.fromCharCode(0o032):
				retVal = { name: 'Leak Sensor', modelNumber: '2852-522', class: InsteonLeakSensorDevice };
				break;
			case '\n':
				retVal = { name: 'INSTEON Smoke Sensor', modelNumber: '', class: InsteonSmokeSensorDevice };
				break;
			case String.fromCharCode(0o021):
				retVal = { name: 'INSTEON Hidden Door Sensor', modelNumber: '2845-222', class: InsteonDoorWindowSensorDevice };
				break;
			case String.fromCharCode(0o024):
				retVal = { name: 'INSTEON Hidden Door Sensor', modelNumber: '2845-422', class: InsteonDoorWindowSensorDevice };
				break;
			case String.fromCharCode(0o025):
				break;
			case String.fromCharCode(0o033):
				retVal = { name: 'INSTEON Hidden Door Sensor', modelNumber: '2845-522', class: InsteonDoorWindowSensorDevice };
				break;
			case String.fromCharCode(0o026):
				retVal = { name: 'Insteon Motion Sensor II', modelNumber: '2844-222', class: InsteonMotionSensorDevice };
				break;
			case String.fromCharCode(0o030):
				retVal = { name: 'Insteon Motion Sensor II', modelNumber: '2844-522', class: InsteonMotionSensorDevice };
		}
		if((node.nodeDefId === 'BinaryAlarm' || node.nodeDefId === 'BinaryAlarm_ADV' ) && subAddress !== '1')
		{
			if(retVal)
				retVal.class = ISYBinaryStateDevice(InsteonBaseDevice);
		}
		return retVal;
	}

	private static getNLSClimateControlInfo(deviceCode: number): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		let retVal = null;
		switch (c) {
			case String.fromCharCode(0o000):
				retVal = {
					name: 'BROAN SMSC080 Exhaust Fan'};
				break;
			case String.fromCharCode(0o002):
				retVal = {
					name:  'BROAN SMSC110 Exhaust Fan'};
				break;
			case String.fromCharCode(0o005):
				retVal = {
					name:  'BROAN, Venmar, Best Rangehoods'};
				break;
			case String.fromCharCode(0o001):
				break;
			case String.fromCharCode(0o004):
				retVal = {
					name:  'Compacta EZTherm'};
				break;
			case String.fromCharCode(0o003):
				retVal = { name: 'INSTEON Thermostat Adapter', modelNumber: '2441V' };
				break;
			case '\t':
				retVal = { name: 'INSTEON Thermostat Adapter', modelNumber: '2441V-SP' };
				break;
			case String.fromCharCode(0o013):
				retVal = { name: 'INSTEON Thermostat', modelNumber: '2441TH' };
				break;
			case String.fromCharCode(0o017):
				retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-422' };
				break;
			case String.fromCharCode(0o020):
				retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-522' };
				break;
			case String.fromCharCode(0o021):
				retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-432' };
				break;
			case String.fromCharCode(0o022):
				retVal = { name: 'INSTEON Thermostat', modelNumber: '2732-532' };
				break;
			case String.fromCharCode(0o023):
				retVal = { name: 'INSTEON Thermostat Heat Pump', modelNumber: '2732-242' };
				break;
			case String.fromCharCode(0o024):
				retVal = { name: 'INSTEON Thermostat Heat Pump for Europe', modelNumber: '2732-442' };
				break;
			case String.fromCharCode(0o025):
				retVal = { name: 'INSTEON Thermostat Heat Pump for Aus/NZ', modelNumber: '2732-542' };
				break;
			case String.fromCharCode(0o026):
				retVal = { name: 'INSTEON Thermostat 2.0 (HVAC/HP)', modelNumber: '2732-222' };
				break;
			case String.fromCharCode(0o027):
				retVal = { name: 'INSTEON Thermostat 2.0 (HVAC/HP) for Europe', modelNumber: '2732-422' };
				break;
			case String.fromCharCode(0o030):
				retVal = { name: 'INSTEON Thermostat 2.0 (HVAC/HP) for Aus/NZ', modelNumber: '(2732-522)' };
				break;
			case '\n':
				retVal = { name: 'INSTEON Wireless Thermostat', modelNumber: '2441ZTH' };
				break;
			case String.fromCharCode(0o016):
				retVal = { name: 'All-In-One INSTEON Thermostat Adapter', modelNumber: '2491T' };
		}
		if (retVal?.class === undefined) { retVal.class = InsteonThermostatDevice; }
		return retVal;
	}

	private static getNLSAccessControlInfo(deviceCode: number): { name: string; modelNumber?: string; version?: string; class?: typeof InsteonBaseDevice; } {
		const c = String.fromCharCode(deviceCode);
		const retVal = { name: '', modelNumber: '', class: InsteonLockDevice };
		switch (c) {
			case String.fromCharCode(0o006):
				retVal.name = 'MorningLinc';
				break;
			case '\n':
				retVal.name = 'Lock Controller';
		}
		return retVal;
	}

	private static getNLSEnergyManagement(deviceCode: number): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		let retVal = null;
		switch (c) {
			case String.fromCharCode(0o000):
				retVal = {
					name: 'ZBPCM (iMeter Solo compat.)'
				};
				break;
			case String.fromCharCode(0o007):
				retVal = { name: 'iMeter Solo', modelNumber: '2423A1' };
				break;
			case String.fromCharCode(0o013):
				retVal = {
					name: 'Dual Band Normally Closed 240V Load Controller', modelNumber: '(2477SA2)'
				};
				break;
			case '\n':
				retVal = { name: 'Dual Band Normally Open 240V Load Controller', modelNumber: '(2477SA1)' };
				break;
			case '\r':
				retVal = {
					name: 'Energy Display', modelNumber: '(2448A2)'
				};
		}
		return retVal;
	}

	private static getNLSWindowsCovering(deviceCode: number): { name: string; modelNumber?: string; version?: string; class?: typeof ISYDevice; } {
		const c = String.fromCharCode(deviceCode);
		let retVal = null;
		switch (c) {
			case String.fromCharCode(0o001):
				retVal = { name: 'Micro Module Open/Close', modelNumber: '2444-222' };
				break;
			case String.fromCharCode(0o002):
				retVal = { name: 'Micro Module Open/Close', modelNumber: '2444-422' };
				break;
			case String.fromCharCode(0o003):
				break;
			case String.fromCharCode(0o007):
				retVal = { name: 'Micro Module Open/Close', modelNumber: '2444-522' };
		}
		return retVal;
	}
}
