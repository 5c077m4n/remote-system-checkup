import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class VirtualBoxService {
	public getVboxInfo(): Promise<si.Systeminformation.VboxInfoData[]> {
		return si.vboxInfo();
	}
}
