import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorsService } from './sevices/sensors/sensors.service';
import { AuthService } from './sevices/auth/auth.service';
import { RecipesModule } from './recipes/recipes.module';

@Module({
	imports: [
		GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
		RecipesModule,
	],
	controllers: [AppController],
	providers: [AppService, SensorsService, AuthService],
})
export class AppModule {}
