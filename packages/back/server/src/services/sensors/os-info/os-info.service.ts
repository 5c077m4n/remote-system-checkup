import { Injectable } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class OsInfoService {
	public getOsInfo(): Promise<si.Systeminformation.OsData> {
		return si.osInfo();
	}
	public getUuid(): Promise<si.Systeminformation.UuidData> {
		return si.uuid();
	}
	public getVersions(): Promise<si.Systeminformation.VersionData> {
		return si.versions();
	}
	public getShell(): Promise<string> {
		return si.shell();
	}
	public getUsers(): Promise<si.Systeminformation.UserData[]> {
		return si.users();
	}
}
