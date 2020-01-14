import { Injectable, OnModuleInit } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class NetworkService implements OnModuleInit {
	async onModuleInit(): Promise<void> {
		await si.networkStats();
	}

	public async getNetworkInterfaces(): Promise<
		si.Systeminformation.NetworkInterfacesData[]
	> {
		return si.networkInterfaces();
	}
	public async getNetworkInterfaceDefault(): Promise<string> {
		return si.networkInterfaceDefault();
	}
	public async getNetworkGatewayDefault(): Promise<string> {
		return si.networkGatewayDefault();
	}
	public async getNetworkStats(
		iface?: string,
	): Promise<si.Systeminformation.NetworkStatsData[]> {
		return si.networkStats(iface);
	}
	public async getNetworkConnections(): Promise<
		si.Systeminformation.NetworkConnectionsData[]
	> {
		return si.networkConnections();
	}
	public async getInetChecksite(
		url: string,
	): Promise<si.Systeminformation.InetChecksiteData> {
		return si.inetChecksite(url);
	}
	public async getInetLatency(host?: string): Promise<number> {
		return si.inetLatency(host);
	}
}
