import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { RMQRPCServer } from './rmq/rabbitmq-rpc-server';

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AppModule, {
		strategy: new RMQRPCServer(process.env.RMQ_URI, process.env.AUTH_QUEUE),
	});

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}

	await app.listen(() => console.log('The auth service is now listening.'));
}
bootstrap();
