import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(AuthGuard)
	@Get('test')
	test(@Body() body: any) {
		return { data: 'test' };
	}

	@Post('login')
	login(@Body() body: any): any {
		return { isAllowed: body.username && body.password };
	}

	@UseGuards(AuthGuard)
	@Post('sense')
	getSensorData(@Body() body: any) {
		return { data: 'sensors' };
	}
}
