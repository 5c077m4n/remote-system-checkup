import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class DockerService {
	public getDockerInfo(): Promise<si.Systeminformation.DockerInfoData> {
		return si.dockerInfo();
	}
	public getDockerContainers(
		all: boolean = false,
	): Promise<si.Systeminformation.DockerContainerData[]> {
		return si.dockerContainers(all);
	}
	public getDockerContainerStats(
		ids: string = '*',
	): Promise<si.Systeminformation.DockerContainerStatsData[]> {
		return si.dockerContainerStats(ids);
	}
	public getDockerContainerProcesses(ids: string = '*'): Promise<any> {
		return si.dockerContainerProcesses(ids);
	}
	public getDockerAll(): Promise<any> {
		return si.dockerAll();
	}
}
