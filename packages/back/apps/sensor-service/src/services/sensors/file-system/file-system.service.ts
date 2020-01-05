import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as si from 'systeminformation';

@Injectable()
export class FileSystemService implements OnModuleInit {
	async onModuleInit(): Promise<void> {
		await Promise.all([si.fsStats(), si.disksIO()]);
	}

	@MessagePattern({ cmd: 'diskLayout' })
	public async getDiskLayout(): Promise<
		si.Systeminformation.DiskLayoutData[]
	> {
		return si.diskLayout();
	}
	@MessagePattern({ cmd: 'blockDevices' })
	public async getBlockDevices(): Promise<
		si.Systeminformation.BlockDevicesData[]
	> {
		return si.blockDevices();
	}
	@MessagePattern({ cmd: 'diskIO' })
	public async getDisksIO(): Promise<si.Systeminformation.DisksIoData> {
		return si.disksIO();
	}
	@MessagePattern({ cmd: 'fsSize' })
	public async getFsSize(): Promise<si.Systeminformation.FsSizeData[]> {
		return si.fsSize();
	}
	@MessagePattern({ cmd: 'fsOpenFiles' })
	public async getFsOpenFiles(): Promise<
		si.Systeminformation.FsOpenFilesData[]
	> {
		return si.fsOpenFiles();
	}
	@MessagePattern({ cmd: 'fsStats' })
	public async getFsStats(): Promise<si.Systeminformation.FsStatsData> {
		return si.fsStats();
	}
}
