import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class BatteryService {
	@MessagePattern({ cmd: 'battery' })
	public async getBattery(): Promise<si.Systeminformation.BatteryData> {
		return si.battery();
	}
}
