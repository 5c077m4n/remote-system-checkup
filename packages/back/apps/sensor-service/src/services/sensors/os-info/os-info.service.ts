import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class OsInfoService {
	public async getOsInfo(): Promise<si.Systeminformation.OsData> {
		return si.osInfo();
	}
	public async getUuid(): Promise<si.Systeminformation.UuidData> {
		return si.uuid();
	}
	public async getVersions(): Promise<si.Systeminformation.VersionData> {
		return si.versions();
	}
	public async getShell(): Promise<string> {
		return si.shell();
	}
	public async getUsers(): Promise<si.Systeminformation.UserData[]> {
		return si.users();
	}
}
