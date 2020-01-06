import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class MemoryService {
	public async getMem(): Promise<si.Systeminformation.MemData> {
		return si.mem();
	}
	public async getMemLayout(): Promise<si.Systeminformation.MemLayoutData[]> {
		return si.memLayout();
	}
}
