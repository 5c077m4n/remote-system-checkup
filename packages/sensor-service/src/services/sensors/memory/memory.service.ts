import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class MemoryService {
	public getMem(): Promise<si.Systeminformation.MemData> {
		return si.mem();
	}
	public getMemLayout(): Promise<si.Systeminformation.MemLayoutData[]> {
		return si.memLayout();
	}
}
