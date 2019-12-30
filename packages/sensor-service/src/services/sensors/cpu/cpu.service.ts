import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class CpuService {
	public getCpu(): Promise<si.Systeminformation.CpuData> {
		return si.cpu();
	}
	public getCpuFlags(): Promise<string> {
		return si.cpuFlags();
	}
	public getCpuCache(): Promise<si.Systeminformation.CpuCacheData> {
		return si.cpuCache();
	}
	public getCpuCurrentspeed(): Promise<
		si.Systeminformation.CpuCurrentSpeedData
	> {
		return si.cpuCurrentspeed();
	}
	public getCpuTemperature(): Promise<
		si.Systeminformation.CpuTemperatureData
	> {
		return si.cpuTemperature();
	}
}
