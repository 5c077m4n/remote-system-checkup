import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class SystemService {
	public getSystem(): Promise<si.Systeminformation.SystemData> {
		return si.system();
	}
	public getBios(): Promise<si.Systeminformation.BiosData> {
		return si.bios();
	}
	public getBaseboard(): Promise<si.Systeminformation.BaseboardData> {
		return si.baseboard();
	}
	public getChassis(): Promise<si.Systeminformation.ChassisData> {
		return si.chassis();
	}
}
