import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class MemoryService {
	@MessagePattern({ cmd: 'mem' })
	public async getMem(): Promise<si.Systeminformation.MemData> {
		return si.mem();
	}
	@MessagePattern({ cmd: 'memLayout' })
	public async getMemLayout(): Promise<si.Systeminformation.MemLayoutData[]> {
		return si.memLayout();
	}
}
