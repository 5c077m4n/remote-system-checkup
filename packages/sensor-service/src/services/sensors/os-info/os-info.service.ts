import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class OsInfoService {
	@MessagePattern({ cmd: 'osInfo' })
	public async getOsInfo(): Promise<si.Systeminformation.OsData> {
		return si.osInfo();
	}
	@MessagePattern({ cmd: 'uuid' })
	public async getUuid(): Promise<si.Systeminformation.UuidData> {
		return si.uuid();
	}
	@MessagePattern({ cmd: 'versions' })
	public async getVersions(): Promise<si.Systeminformation.VersionData> {
		return si.versions();
	}
	@MessagePattern({ cmd: 'shell' })
	public async getShell(): Promise<string> {
		return si.shell();
	}
	@MessagePattern({ cmd: 'users' })
	public async getUsers(): Promise<si.Systeminformation.UserData[]> {
		return si.users();
	}
}
