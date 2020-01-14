import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class CpuService {
	public async getCpu(): Promise<si.Systeminformation.CpuData> {
		return si.cpu();
	}
	public async getCpuFlags(): Promise<string> {
		return si.cpuFlags();
	}
	public async getCpuCache(): Promise<si.Systeminformation.CpuCacheData> {
		return si.cpuCache();
	}
	public async getCpuCurrentspeed(): Promise<
		si.Systeminformation.CpuCurrentSpeedData
	> {
		return si.cpuCurrentspeed();
	}
	public async getCpuTemperature(): Promise<
		si.Systeminformation.CpuTemperatureData
	> {
		return si.cpuTemperature();
	}
}
