import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckService } from './services/health-check/health-check.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '../../.dev.env',
		}),
		ClientsModule.register([
			{
				name: process.env.GQL_SERVICE,
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RMQ_URI],
					queue: process.env.GQL_QUEUE,
					queueOptions: { durable: false },
				},
			},
			{
				name: process.env.AUTH_SERVICE,
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RMQ_URI],
					queue: process.env.AUTH_QUEUE,
					queueOptions: { durable: false },
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
