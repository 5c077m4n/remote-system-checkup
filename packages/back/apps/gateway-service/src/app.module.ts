import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckService } from './services/health-check/health-check.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'GQL_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://localhost:5672'],
					queue: 'GQL_QUEUE',
					queueOptions: { durable: false },
					prefetchCount: 128,
				},
			},
			{
				name: 'AUTH_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://localhost:5672'],
					queue: 'AUTH_QUEUE',
					queueOptions: { durable: false },
					prefetchCount: 128,
				},
			},
		]),
		TerminusModule.forRootAsync({
			useClass: HealthCheckService,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
