import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class DockerService {
	public async getDockerInfo(): Promise<si.Systeminformation.DockerInfoData> {
		return si.dockerInfo();
	}
	public async getDockerContainers(
		all: boolean = false,
	): Promise<si.Systeminformation.DockerContainerData[]> {
		return si.dockerContainers(all);
	}
	public async getDockerContainerStats(
		ids: string = '*',
	): Promise<si.Systeminformation.DockerContainerStatsData[]> {
		return si.dockerContainerStats(ids);
	}
	public async getDockerContainerProcesses(ids: string = '*'): Promise<any> {
		return si.dockerContainerProcesses(ids);
	}
	public async getDockerAll(): Promise<any> {
		return si.dockerAll();
	}
}
