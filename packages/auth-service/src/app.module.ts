import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '../../.dev.env',
		}),
		ClientsModule.register([
			{
				name: process.env.ENCRYPTION_SERVICE,
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RMQ_URI],
					queue: process.env.ENCRYPTION_QUEUE,
					queueOptions: { durable: false },
				},
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
