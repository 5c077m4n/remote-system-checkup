import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '../../.dev.env',
		}),
		ClientsModule.register([
			{
				name: process.env.SENSOR_SERVICE,
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RMQ_URI],
					queue: process.env.SENSOR_QUEUE,
					queueOptions: { durable: false },
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
