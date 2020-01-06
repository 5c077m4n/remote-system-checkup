import { Injectable, OnModuleInit } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class FileSystemService implements OnModuleInit {
	async onModuleInit(): Promise<void> {
		await Promise.all([si.fsStats(), si.disksIO()]);
	}

	public async getDiskLayout(): Promise<
		si.Systeminformation.DiskLayoutData[]
	> {
		return si.diskLayout();
	}
	public async getBlockDevices(): Promise<
		si.Systeminformation.BlockDevicesData[]
	> {
		return si.blockDevices();
	}
	public async getDisksIO(): Promise<si.Systeminformation.DisksIoData> {
		return si.disksIO();
	}
	public async getFsSize(): Promise<si.Systeminformation.FsSizeData[]> {
		return si.fsSize();
	}
	public async getFsOpenFiles(): Promise<
		si.Systeminformation.FsOpenFilesData[]
	> {
		return si.fsOpenFiles();
	}
	public async getFsStats(): Promise<si.Systeminformation.FsStatsData> {
		return si.fsStats();
	}
}
