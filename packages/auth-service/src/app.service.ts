import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
	constructor(
		@Inject('ENCRYPTION_SERVICE') private readonly encService: ClientProxy,
	) {}
	async onModuleInit() {
		return await this.encService
			.send<boolean>({ cmd: 'JWT' }, [])
			.toPromise();
	}

	public isUserAllowed(data: any): boolean {
		return data.username && data.password;
	}
}
