import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class SystemService {
	public async getSystem(): Promise<si.Systeminformation.SystemData> {
		return si.system();
	}
	public async getBios(): Promise<si.Systeminformation.BiosData> {
		return si.bios();
	}
	public async getBaseboard(): Promise<si.Systeminformation.BaseboardData> {
		return si.baseboard();
	}
	public async getChassis(): Promise<si.Systeminformation.ChassisData> {
		return si.chassis();
	}
}
