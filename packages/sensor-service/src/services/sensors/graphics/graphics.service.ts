import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class GraphicsService {
	@MessagePattern({ cmd: 'graphics' })
	public async getGraphics(): Promise<si.Systeminformation.GraphicsData> {
		return si.graphics();
	}
}
