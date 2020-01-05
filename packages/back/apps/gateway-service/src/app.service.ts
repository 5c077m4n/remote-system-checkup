import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
	constructor(@Inject('GQL_SERVICE') gqlService: ClientProxy) {}

	getHello(): string {
		return 'Hello World!';
	}
}
