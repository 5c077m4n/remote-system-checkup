import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class BatteryService {
	public async getBattery(): Promise<si.Systeminformation.BatteryData> {
		return si.battery();
	}
}
