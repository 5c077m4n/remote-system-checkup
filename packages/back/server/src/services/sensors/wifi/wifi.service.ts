import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class WifiService {
	public getWifiNetworks(): Promise<si.Systeminformation.WifiNetworkData[]> {
		return si.wifiNetworks();
	}
}
