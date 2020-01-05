import { Module } from '@nestjs/common';

import { SensorsModule } from './services/sensors/sensors.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [SensorsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
