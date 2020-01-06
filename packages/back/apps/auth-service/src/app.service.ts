import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	public isUserAllowed(data: any): boolean {
		return data.username && data.password;
	}
}
