import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class TimeService {
	public async getTime(): Promise<si.Systeminformation.TimeData> {
		return si.time();
	}
}
