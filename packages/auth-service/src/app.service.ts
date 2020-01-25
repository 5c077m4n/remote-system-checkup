import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
	constructor(
		@Inject('ENCRYPTION_SERVICE')
		private readonly encryptService: ClientProxy,
	) {}

	public isUserAllowed(data: any): boolean {
		this.encryptService
			.send({ cmd: 'BCRYPT_VERIFY' }, 'is_this_the_correct_password?')
			.subscribe();
		return data.username && data.password;
	}
}
