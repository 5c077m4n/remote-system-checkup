import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemInfoResolver } from './system-info/system-info.resolver';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
		}),
	],
	controllers: [AppController],
	providers: [AppService, SystemInfoResolver],
})
export class AppModule {}
