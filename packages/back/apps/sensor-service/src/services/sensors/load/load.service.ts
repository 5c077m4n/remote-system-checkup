import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class LoadService {
	public async getCurrentLoad(): Promise<
		si.Systeminformation.CurrentLoadData
	> {
		return si.currentLoad();
	}
	public async getFullLoac(): Promise<number> {
		return si.fullLoad();
	}
	public async getProcesses(): Promise<si.Systeminformation.ProcessesData> {
		return si.processes();
	}
	public async getServices(
		matcher: string = '*',
	): Promise<si.Systeminformation.ServicesData[]> {
		return si.services(matcher);
	}
}
