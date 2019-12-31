import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class NetworkService implements OnModuleInit {
	async onModuleInit(): Promise<void> {
		await si.networkStats();
	}

	@MessagePattern({ cmd: 'networkInterfaces' })
	public async getNetworkInterfaces(): Promise<
		si.Systeminformation.NetworkInterfacesData[]
	> {
		return si.networkInterfaces();
	}
	@MessagePattern({ cmd: 'networkInterfaceDefault' })
	public async getNetworkInterfaceDefault(): Promise<string> {
		return si.networkInterfaceDefault();
	}
	@MessagePattern({ cmd: 'networkGatewayDefault' })
	public async getNetworkGatewayDefault(): Promise<string> {
		return si.networkGatewayDefault();
	}
	@MessagePattern({ cmd: 'networkStats' })
	public async getNetworkStats(
		iface?: string,
	): Promise<si.Systeminformation.NetworkStatsData[]> {
		return si.networkStats(iface);
	}
	@MessagePattern({ cmd: 'networkConnections' })
	public async getNetworkConnections(): Promise<
		si.Systeminformation.NetworkConnectionsData[]
	> {
		return si.networkConnections();
	}
	@MessagePattern({ cmd: 'inetChecksite' })
	public async getInetChecksite(
		url: string,
	): Promise<si.Systeminformation.InetChecksiteData> {
		return si.inetChecksite(url);
	}
	@MessagePattern({ cmd: 'inetLatency' })
	public async getInetLatency(host?: string): Promise<number> {
		return si.inetLatency(host);
	}
}
