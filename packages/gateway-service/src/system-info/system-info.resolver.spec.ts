import { Test, TestingModule } from '@nestjs/testing';
import { SystemInfoResolver } from './system-info.resolver';

describe('SystemInfoResolver', () => {
	let resolver: SystemInfoResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SystemInfoResolver],
		}).compile();

		resolver = module.get<SystemInfoResolver>(SystemInfoResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
