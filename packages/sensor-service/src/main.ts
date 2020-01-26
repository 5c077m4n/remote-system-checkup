import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: [process.env.RMQ_URI],
			queue: process.env.SENSOR_QUEUE,
			queueOptions: { durable: false },
		},
	});

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	await app.listen(() => console.log('The sensor service is now listening.'));
}
bootstrap();
