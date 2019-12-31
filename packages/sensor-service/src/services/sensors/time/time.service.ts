import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class TimeService {
	@MessagePattern({ cmd: 'time' })
	public async getTime(): Promise<si.Systeminformation.TimeData> {
		return si.time();
	}
}
