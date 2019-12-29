import { Injectable, OnModuleInit } from '@nestjs/common';

import * as si from 'systeminformation';

@Injectable()
export class FileSystemService implements OnModuleInit {
	async onModuleInit(): Promise<void> {
		await Promise.all([si.fsStats(), si.disksIO()]);
	}

	public getDiskLayout(): Promise<si.Systeminformation.DiskLayoutData[]> {
		return si.diskLayout();
	}
	public getBlockDevices(): Promise<si.Systeminformation.BlockDevicesData[]> {
		return si.blockDevices();
	}
	public getDisksIO(): Promise<si.Systeminformation.DisksIoData> {
		return si.disksIO();
	}
	public getFsSize(): Promise<si.Systeminformation.FsSizeData[]> {
		return si.fsSize();
	}
	public getFsOpenFiles(): Promise<si.Systeminformation.FsOpenFilesData[]> {
		return si.fsOpenFiles();
	}
	public getFsStats(): Promise<si.Systeminformation.FsStatsData> {
		return si.fsStats();
	}
}
