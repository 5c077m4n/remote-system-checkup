import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class LoadService {
	public getCurrentLoad(): Promise<si.Systeminformation.CurrentLoadData> {
		return si.currentLoad();
	}
	public getFullLoac(): Promise<number> {
		return si.fullLoad();
	}
	public getProcesses(): Promise<si.Systeminformation.ProcessesData> {
		return si.processes();
	}
	public getServices(
		matcher: string = '*',
	): Promise<si.Systeminformation.ServicesData[]> {
		return si.services(matcher);
	}
}
