import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	isUserAllowed(): boolean {
		return true;
	}
}
