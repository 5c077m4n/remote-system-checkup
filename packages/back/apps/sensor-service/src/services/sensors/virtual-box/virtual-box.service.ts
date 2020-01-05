import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class VirtualBoxService {
	@MessagePattern({ cmd: 'vboxInfo' })
	public async getVboxInfo(): Promise<si.Systeminformation.VboxInfoData[]> {
		return si.vboxInfo();
	}
}
