import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class GraphicsService {
	public async getGraphics(): Promise<si.Systeminformation.GraphicsData> {
		return si.graphics();
	}
}
