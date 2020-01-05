import { Test, TestingModule } from '@nestjs/testing';
import { VirtualBoxService } from './virtual-box.service';

describe('VirtualBoxService', () => {
	let service: VirtualBoxService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [VirtualBoxService],
		}).compile();

		service = module.get<VirtualBoxService>(VirtualBoxService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
