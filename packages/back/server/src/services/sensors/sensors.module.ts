import { Module } from '@nestjs/common';

import { TimeService } from './time/time.service';
import { SystemService } from './system/system.service';
import { CpuService } from './cpu/cpu.service';
import { MemoryService } from './memory/memory.service';
import { BatteryService } from './battery/battery.service';
import { GraphicsService } from './graphics/graphics.service';
import { OsInfoService } from './os-info/os-info.service';
import { LoadService } from './load/load.service';
import { FileSystemService } from './file-system/file-system.service';
import { WifiService } from './wifi/wifi.service';
import { NetworkService } from './network/network.service';
import { DockerService } from './docker/docker.service';
import { VirtualBoxService } from './virtual-box/virtual-box.service';

const services = [
	TimeService,
	SystemService,
	CpuService,
	MemoryService,
	BatteryService,
	GraphicsService,
	OsInfoService,
	LoadService,
	FileSystemService,
	NetworkService,
	WifiService,
	DockerService,
	VirtualBoxService,
];

@Module({
	providers: [...services],
	exports: [...services],
})
export class SensorsModule {}
