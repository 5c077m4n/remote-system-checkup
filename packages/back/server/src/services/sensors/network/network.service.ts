import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class NetworkService {
	public getNetworkInterfaces(): Promise<
		si.Systeminformation.NetworkInterfacesData[]
	> {
		return si.networkInterfaces();
	}
	public getNetworkInterfaceDefault(): Promise<string> {
		return si.networkInterfaceDefault();
	}
	public getNetworkGatewayDefault(): Promise<string> {
		return si.networkGatewayDefault();
	}
	public getNetworkStats(
		iface?: string,
	): Promise<si.Systeminformation.NetworkStatsData[]> {
		return si.networkStats(iface);
	}
	public getNetworkConnections(): Promise<
		si.Systeminformation.NetworkConnectionsData[]
	> {
		return si.networkConnections();
	}
	public getInetChecksite(
		url: string,
	): Promise<si.Systeminformation.InetChecksiteData> {
		return si.inetChecksite(url);
	}
	public getInetLatency(host?: string): Promise<number> {
		return si.inetLatency(host);
	}
}
