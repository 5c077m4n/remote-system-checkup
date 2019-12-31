import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class LoadService {
	@MessagePattern({ cmd: 'currentLoad' })
	public async getCurrentLoad(): Promise<
		si.Systeminformation.CurrentLoadData
	> {
		return si.currentLoad();
	}
	@MessagePattern({ cmd: 'fullLoad' })
	public async getFullLoac(): Promise<number> {
		return si.fullLoad();
	}
	@MessagePattern({ cmd: 'processes' })
	public async getProcesses(): Promise<si.Systeminformation.ProcessesData> {
		return si.processes();
	}
	@MessagePattern({ cmd: 'getServices' })
	public async getServices(
		matcher: string = '*',
	): Promise<si.Systeminformation.ServicesData[]> {
		return si.services(matcher);
	}
}
