import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as helmet from 'fastify-helmet';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({ logger: true }),
	);
	app.register(helmet);
	app.connectMicroservice({
		transport: Transport.RMQ,
		options: {
			urls: ['amqp://localhost:5672'],
			queue: 'GATEWAY_QUEUE',
			queueOptions: { durable: false },
			prefetchCount: 128,
		},
	});

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	await app.startAllMicroservicesAsync();
	await app.listen(3000, '0.0.0.0');
}
bootstrap();