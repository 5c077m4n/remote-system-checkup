import { Injectable } from '@nestjs/common';
import {
	TerminusEndpoint,
	TerminusOptionsFactory,
	DNSHealthIndicator,
	TerminusModuleOptions,
	MemoryHealthIndicator,
	DiskHealthIndicator,
	MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class HealthCheckService implements TerminusOptionsFactory {
	constructor(
		private readonly dns: DNSHealthIndicator,
		private readonly mem: MemoryHealthIndicator,
		private readonly disk: DiskHealthIndicator,
		private readonly micro: MicroserviceHealthIndicator,
	) {}

	createTerminusOptions(): TerminusModuleOptions {
		const healthEndpoint: TerminusEndpoint = {
			url: '/health-check',
			healthIndicators: [
				async () =>
					this.dns.pingCheck('netword_test', 'https://google.com'),
				async () => this.mem.checkHeap('memory_heap', 128e6),
				async () =>
					this.disk.checkStorage('disk_state', {
						path: process.cwd(),
						threshold: 512e6,
					}),
				async () =>
					this.micro.pingCheck('rabbitmq', {
						transport: Transport.RMQ,
					}),
			],
		};
		return {
			endpoints: [healthEndpoint],
		};
	}
}
