import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class WifiService {
	@MessagePattern({ cmd: 'wifiNetworks' })
	public async getWifiNetworks(): Promise<
		si.Systeminformation.WifiNetworkData[]
	> {
		return si.wifiNetworks();
	}
}
