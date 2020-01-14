import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class WifiService {
	public async getWifiNetworks(): Promise<
		si.Systeminformation.WifiNetworkData[]
	> {
		return si.wifiNetworks();
	}
}
