import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: ['amqp://localhost:5672'],
			queue: 'GQL_QUEUE',
			queueOptions: { durable: false },
			prefetchCount: 128,
		},
	});
	await app.listen(() => {
		console.log('The graphql service is now listening.');
	});
}
bootstrap();