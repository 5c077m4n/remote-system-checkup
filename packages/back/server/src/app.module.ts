import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { SensorsModule } from './services/sensors/sensors.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
	imports: [
		GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
		RecipesModule,
		SensorsModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
