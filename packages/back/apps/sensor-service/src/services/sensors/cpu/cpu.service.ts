import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class CpuService {
	@MessagePattern({ cmd: 'cpu' })
	public async getCpu(): Promise<si.Systeminformation.CpuData> {
		return si.cpu();
	}
	@MessagePattern({ cmd: 'cpuFlags' })
	public async getCpuFlags(): Promise<string> {
		return si.cpuFlags();
	}
	@MessagePattern({ cmd: 'cpuCache' })
	public async getCpuCache(): Promise<si.Systeminformation.CpuCacheData> {
		return si.cpuCache();
	}
	@MessagePattern({ cmd: 'cpuCurrentspeed' })
	public async getCpuCurrentspeed(): Promise<
		si.Systeminformation.CpuCurrentSpeedData
	> {
		return si.cpuCurrentspeed();
	}
	@MessagePattern({ cmd: 'cpuTemprature' })
	public async getCpuTemperature(): Promise<
		si.Systeminformation.CpuTemperatureData
	> {
		return si.cpuTemperature();
	}
}
