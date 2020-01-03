import {
	CanActivate,
	ExecutionContext,
	Injectable,
	Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		@Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
	) {}
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return this.authService.send<boolean>(
			{ cmd: 'isAuthenticated' },
			context.getArgByIndex(0).body ?? {},
		);
	}
}
