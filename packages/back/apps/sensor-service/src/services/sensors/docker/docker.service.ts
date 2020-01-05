import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class DockerService {
	@MessagePattern({ cmd: 'dockerInfo' })
	public async getDockerInfo(): Promise<si.Systeminformation.DockerInfoData> {
		return si.dockerInfo();
	}
	@MessagePattern({ cmd: 'dockerContainers' })
	public async getDockerContainers(
		all: boolean = false,
	): Promise<si.Systeminformation.DockerContainerData[]> {
		return si.dockerContainers(all);
	}
	@MessagePattern({ cmd: 'dockerContainerStats' })
	public async getDockerContainerStats(
		ids: string = '*',
	): Promise<si.Systeminformation.DockerContainerStatsData[]> {
		return si.dockerContainerStats(ids);
	}
	@MessagePattern({ cmd: 'dockerContainerProcesses' })
	public async getDockerContainerProcesses(ids: string = '*'): Promise<any> {
		return si.dockerContainerProcesses(ids);
	}
	@MessagePattern({ cmd: 'dockerAll' })
	public async getDockerAll(): Promise<any> {
		return si.dockerAll();
	}
}
