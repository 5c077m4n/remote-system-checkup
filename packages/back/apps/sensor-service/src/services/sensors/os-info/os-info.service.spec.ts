import { Test, TestingModule } from '@nestjs/testing';
import { OsInfoService } from './os-info.service';

describe('OsInfoService', () => {
	let service: OsInfoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [OsInfoService],
		}).compile();

		service = module.get<OsInfoService>(OsInfoService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
