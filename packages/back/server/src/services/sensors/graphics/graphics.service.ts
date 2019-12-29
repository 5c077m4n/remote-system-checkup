import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class GraphicsService {
	public getGraphics(): Promise<si.Systeminformation.GraphicsData> {
		return si.graphics();
	}
}
