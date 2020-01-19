import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
	constructor(
		@Inject('ENCRYPTION_SERVICE')
		private readonly encryptService: ClientProxy,
	) {}
	onModuleInit() {
		this.encryptService
			.send({ cmd: 'BCRYPT_VERIFY' }, 'is_this_the_correct_password?')
			.subscribe();
	}

	public isUserAllowed(data: any): boolean {
		return data.username && data.password;
	}
}
