import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'SENSEOR_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://localhost:5672'],
					queue: 'SENSOR_QUEUE',
					queueOptions: { durable: false },
					prefetchCount: 128,
				},
			},
		]),
		GraphQLModule.forRoot({
			debug: false,
			playground: false,
			autoSchemaFile: 'schema.gql',
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
