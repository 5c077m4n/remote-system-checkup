import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SensorsModule } from './services/sensors/sensors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '../../.dev.env',
		}),
		SensorsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
