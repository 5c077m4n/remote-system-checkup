import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class VirtualBoxService {
	public async getVboxInfo(): Promise<si.Systeminformation.VboxInfoData[]> {
		return si.vboxInfo();
	}
}
