import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
	@MessagePattern({ cmd: 'isAuthenticated' })
	isUserAllowed({ username, password }): boolean {
		return username && password;
	}
}
