import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as helmet from 'helmet';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: [`amqp://localhost:5672`],
			queue: 'gateway_queue',
			queueOptions: { durable: false },
		},
	});
	app.use(helmet());

	await app.startAllMicroservicesAsync();
	await app.listen(3000, '0.0.0.0');
}
bootstrap();
