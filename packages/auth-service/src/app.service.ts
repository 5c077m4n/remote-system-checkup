import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
	constructor(
		@Inject('ENCRYPTION_SERVICE')
		private readonly encryptService: ClientProxy,
	) {}
	async onModuleInit() {
		return await this.encryptService
			.send<boolean>({ cmd: 'JWT' }, [1, 2, 3])
			.toPromise();
	}

	public isUserAllowed(data: any): boolean {
		return data.username && data.password;
	}
}
