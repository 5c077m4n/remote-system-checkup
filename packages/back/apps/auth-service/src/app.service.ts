import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	isUserAllowed({ username, password }): boolean {
		return username && password;
	}
}
