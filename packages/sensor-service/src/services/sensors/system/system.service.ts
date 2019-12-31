import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class SystemService {
	@MessagePattern({ cmd: 'system' })
	public async getSystem(): Promise<si.Systeminformation.SystemData> {
		return si.system();
	}
	@MessagePattern({ cmd: 'bios' })
	public async getBios(): Promise<si.Systeminformation.BiosData> {
		return si.bios();
	}
	@MessagePattern({ cmd: 'baseboard' })
	public async getBaseboard(): Promise<si.Systeminformation.BaseboardData> {
		return si.baseboard();
	}
	@MessagePattern({ cmd: 'chassis' })
	public async getChassis(): Promise<si.Systeminformation.ChassisData> {
		return si.chassis();
	}
}
