import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'ENCRYPTION_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://localhost:5672'],
					queue: 'ENCRYPTION_QUEUE',
					queueOptions: { durable: false },
					prefetchCount: 128,
				},
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
